import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const exceptionResponse: any = exception.getResponse();
    let errorDescription = 'Invalid input data';

    if (Array.isArray(exceptionResponse.message)) {
      errorDescription = exceptionResponse.message
        .map((err: ValidationError) =>
          Object.values(err.constraints).join(', '),
        )
        .join('; ');
    }

    response.status(status).json({
      error_code: 'INVALID_DATA',
      error_description: errorDescription,
    });
  }
}
