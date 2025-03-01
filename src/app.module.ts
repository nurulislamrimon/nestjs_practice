import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigDev } from './config/db.dev';
import { ConfigModule } from '@nestjs/config';
import { env } from './config/env';
import { dbConfigProd } from './config/db.production';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { AddressModule } from './address/address.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // env configuration ==============
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    // database connection ==============
    TypeOrmModule.forRoot(
      env.environment === 'production' ? dbConfigProd : dbConfigDev,
    ),
    // modules==============
    UserModule,
    StudentModule,
    AddressModule,
    CourseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
