import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class DeleteEnterpriseDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
