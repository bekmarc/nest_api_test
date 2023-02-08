import { IsNotEmpty, MaxLength, IsString } from "class-validator";

export class RegisterUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}