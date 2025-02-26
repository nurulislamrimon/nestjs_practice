import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, any> {
    return { success: true, message: 'Hello From NestJS!' };
  }
}
