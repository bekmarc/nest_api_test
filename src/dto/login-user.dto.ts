import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}