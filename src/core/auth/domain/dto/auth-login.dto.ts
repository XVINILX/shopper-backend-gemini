import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({ type: String, description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'User password' })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
