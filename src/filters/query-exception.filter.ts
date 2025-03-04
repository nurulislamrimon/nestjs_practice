import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Handle duplicate entry (ER_DUP_ENTRY)
    if ((exception as any).code === 'ER_DUP_ENTRY') {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate entry, this record already exists';
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
