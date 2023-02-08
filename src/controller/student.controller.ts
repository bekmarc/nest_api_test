import { Body, Controller, Post, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Delete, Get, Param, Put } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { StudentService } from 'src/services/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request!',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated!',
        existingStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getStudents(@Res() response) {
    try {
      const studentsData = await this.studentService.getAllStudents();

      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentsData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
