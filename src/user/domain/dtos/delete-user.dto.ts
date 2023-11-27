import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
