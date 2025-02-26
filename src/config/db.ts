import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: env.db_pass,
  database: 'nestjs_practice',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
