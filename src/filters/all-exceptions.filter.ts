import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    const errorResponse: {
      success: boolean;
      message: string;
      errorMessages: { path: string; message: string }[];
    } = {
      success: false,
      message: 'Internal Server Error',
      errorMessages: [],
    };

    // Handle validation errors (DTO validation)
    if (exception instanceof HttpException) {
      const responseObject = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof responseObject === 'object' && 'message' in responseObject) {
        errorResponse.message = 'Validation Error';
        errorResponse.errorMessages = Array.isArray(responseObject.message)
          ? responseObject.message.map((msg) => ({
              path: msg.property,
              message:
                typeof msg === 'string'
                  ? msg
                  : Object.values(msg.constraints || {}).join(', '),
            }))
          : [{ path: '', message: String(responseObject.message) }];
      }
    }

    // Handle TypeORM QueryFailedError
    else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      errorResponse.message = 'Database Error';
      errorResponse.errorMessages = this.formatTypeOrmError(exception);
    }

    response.status(statusCode).json(errorResponse);
  }

  private formatTypeOrmError(exception: QueryFailedError) {
    const message = exception.message;

    // Handle duplicate entry error (ER_DUP_ENTRY)
    if ('code' in exception && exception.code === 'ER_DUP_ENTRY') {
      const match = message.match(/Duplicate entry '(.*?)' for key '(.*?)'/);
      if (match) {
        return [{ path: match[2], message: `'${match[1]}' is already taken` }];
      }
    }

    // Handle "cannot be null" errors
    const match = message.match(/Column '(.*?)' cannot be null/);
    if (match) {
      return [{ path: match[1], message: `${match[1]} is required` }];
    }

    return [{ path: '', message }];
  }
}
