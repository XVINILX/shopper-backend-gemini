import { HttpException, HttpStatus } from '@nestjs/common';

// Define a type for the custom error format
interface CustomErrorResponse {
  error_code: string;
  error_description: string;
}

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
