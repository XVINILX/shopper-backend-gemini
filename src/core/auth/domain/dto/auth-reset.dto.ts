import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, IsUUID } from 'class-validator';

export class AuthResetDto {
  @ApiProperty({ type: String, description: 'User password' })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty()
  @IsUUID()
  id: string;
}
