import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigDev } from './config/db.dev';
import { ConfigModule } from '@nestjs/config';
import { env } from './config/env';
import { dbConfigProd } from './config/db.production';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot(
      env.environment === 'production' ? dbConfigProd : dbConfigDev,
    ),
    // modules==============
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
