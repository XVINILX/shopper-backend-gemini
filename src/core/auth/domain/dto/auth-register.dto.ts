import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRegisterDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  accessToken: string;
}
