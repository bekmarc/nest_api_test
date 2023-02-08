import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "src/dto/create-student.dto";
import { UpdateStudentDto } from "src/dto/update-student.dto";
import { InterfaceStudent } from "src/interface/student.interface";

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel: Model<InterfaceStudent>){}

    async createStudent(createStudentDto: CreateStudentDto):Promise<InterfaceStudent> {
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async updateStudent(studentId: string, UpdateStudentDto: UpdateStudentDto):Promise<InterfaceStudent> {
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, UpdateStudentDto, {new: true});

        if(!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }

        return existingStudent;
    }

    async getAllStudents(): Promise<InterfaceStudent[]> {
        const studentData = await this.studentModel.find()

        if(!studentData || studentData.length == 0){
            throw new NotFoundException('Students data not found!');
        }
        return studentData;
    }

    async getStudent(studentId: string): Promise<InterfaceStudent> {
        const existingStudent = await this.studentModel.findById(studentId).exec()

        if(!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found !`);
        }

        return existingStudent;
    }

    async deleteStudent(studentId: string): Promise<InterfaceStudent> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);

        if(!deletedStudent) {
            throw new NotFoundException(`Student #${studentId} not found!`)
        }
        return deletedStudent;
    }
}