import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { InterfaceUser } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { InterfacePayload } from 'src/interface/payload.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<InterfaceUser>) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<InterfaceUser> {
    const { email } = registerUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await new this.userModel(registerUserDto);

    return newUser.save();
  }

  async findByLogin(UserDTO: LoginUserDto) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: InterfacePayload) {
    
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  sanitizeUser(user: InterfaceUser) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
