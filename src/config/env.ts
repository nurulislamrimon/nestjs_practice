import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  db_pass: process.env.DB_PASS,
};
