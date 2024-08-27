import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UpdateEnterpriseDto {
  @ApiProperty()
  @IsString()
  razaoSocial?: string;

  @ApiProperty()
  @IsString()
  nomeFantasia?: string;

  @ApiProperty()
  @IsString()
  cnpj?: string;

  @ApiProperty()
  @IsString()
  regional?: string;

  @ApiProperty()
  @IsBoolean()
  activate?: boolean;

  @ApiProperty()
  @IsArray()
  especialidades?: string[];

  @ApiProperty()
  openingDate?: Date;
}
