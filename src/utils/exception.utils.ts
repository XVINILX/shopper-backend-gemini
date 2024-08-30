import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomErrorResponse } from './error-response.dto';

export function createHttpException(
  errorResponse: CustomErrorResponse,
  statusCode: HttpStatus,
): HttpException {
  const response: CustomErrorResponse = {
    error_code: errorResponse.error_code,
    error_description: errorResponse.error_description,
  };

  return new HttpException(response, statusCode);
}
