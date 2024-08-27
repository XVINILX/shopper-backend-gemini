import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

export class ReadEnterpriseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  razaoSocial: string;

  @ApiProperty()
  @IsString()
  nomeFantasia: string;

  @ApiProperty()
  @IsString()
  cnpj: string;

  @ApiProperty()
  @IsString()
  regional: string;

  @ApiProperty()
  @IsBoolean()
  activate: boolean;

  @ApiProperty()
  @IsDate()
  openingDate: Date;

  @ApiProperty()
  @IsArray()
  especialidades: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
