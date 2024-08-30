import { ApiProperty } from '@nestjs/swagger';

export class CustomErrorResponse {
  @ApiProperty({
    description: 'Error code',
    example: 'SOME_ERROR_CODE',
  })
  error_code: string;

  @ApiProperty({
    description: 'Description of the error',
    example: 'An error occurred while processing your request.',
  })
  error_description: string;
}
