import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Delete, Get, Param, Put } from '@nestjs/common/decorators';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { InterfacePayload } from 'src/interface/payload.interface';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Res() response, @Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.userService.registerUser(registerUserDto);

      const payload = {
        email: user.email,
      };

      const token = await this.authService.signPayload(payload);

      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been registered successfully',
        userInfo: {
          token,
          user,
        },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: error,
      });
    }
  }

  @Post('login')
  async login(@Res() response, @Body() UserDTO: LoginUserDto) {
    try {
      const user = await this.userService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      //   return { user, token};

      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been logged successfully',
        userInfo: {
          token,
          user,
        },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request!',
      });
    }
  }

  //   @Put('/:id')
  //   async updateStudent(
  //     @Res() response,
  //     @Param('id') studentId: string,
  //     @Body() updateStudentDto: UpdateStudentDto,
  //   ) {
  //     try {
  //       const existingStudent = await this.studentService.updateStudent(
  //         studentId,
  //         updateStudentDto,
  //       );

  //       return response.status(HttpStatus.OK).json({
  //         message: 'Student has been successfully updated!',
  //         existingStudent,
  //       });
  //     } catch (error) {
  //       return response.status(error.status).json(error.response);
  //     }
  //   }

  //   @Get()
  //   async getStudents(@Res() response) {
  //     try {
  //       const studentsData = await this.studentService.getAllStudents();

  //       return response.status(HttpStatus.OK).json({
  //         message: 'All students data found successfully',
  //         studentsData,
  //       });
  //     } catch (error) {
  //       return response.status(error.status).json(error.response);
  //     }
  //   }

  //   @Get('/:id')
  //   async getStudent(@Res() response, @Param('id') studentId: string) {
  //     try {
  //       const existingStudent = await this.studentService.getStudent(studentId);
  //       return response.status(HttpStatus.OK).json({
  //         message: 'Student found successfully',
  //         existingStudent,
  //       });
  //     } catch (error) {
  //       return response.status(error.status).json(error.response);
  //     }
  //   }

  //   @delete('/:id')
  //   async deleteStudent(@Res() response, @Param('id') studentId: string) {
  //     try {
  //       const deletedStudent = await this.studentService.deleteStudent(studentId);
  //       return response.status(HttpStatus.OK).json({
  //         message: 'Student deleted successfully',
  //         deletedStudent,
  //       });
  //     } catch (error) {
  //       return response.status(error.status).json(error.response);
  //     }
  //   }
}
