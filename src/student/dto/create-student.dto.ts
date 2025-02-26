/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  roll: number;

  @IsNotEmpty()
  userId: number;
}
