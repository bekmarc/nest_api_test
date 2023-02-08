import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controller/auth.controller';
import { StudentController } from './controller/student.controller';
import { StudentSchema } from './schema/student.schema';
import { UserSchema } from './schema/user.schema';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://ntaco:luc_carnet@cluster0.00nghev.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'eshop-database' },
    ),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'User', schema: UserSchema }
    ]),
  ],
  controllers: [AppController, StudentController, AuthController],
  providers: [AppService, StudentService, UserService, AuthService, JwtStrategy],
})
export class AppModule {}
