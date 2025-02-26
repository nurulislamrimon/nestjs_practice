/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  @MinLength(3)
  password: string;
}
