/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MinLength(3)
  password: string;
}
