import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { ValidationPipe } from '@nestjs/common';
import { QueryExceptionFilter } from './filters/query-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // validation pipe ==============
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new QueryExceptionFilter());

  await app.listen(env.port);
}
void bootstrap();
