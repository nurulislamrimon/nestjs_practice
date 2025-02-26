import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // validation pipe ==============
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(env.port);
}
void bootstrap();
