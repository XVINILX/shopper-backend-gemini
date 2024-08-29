import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ReadMeasurementDto {
  @IsString()
  image_url: string;

  @IsString()
  measure_uuid: string;

  measure_value: number;
}

export class MeasureDto {
  @IsNotEmpty()
  @IsString()
  measure_uuid: string;

  @IsNotEmpty()
  @IsDateString()
  measure_datetime: Date; // Use string to represent ISO date format

  @IsNotEmpty()
  @IsString()
  measure_type: string;

  @IsNotEmpty()
  @IsBoolean()
  has_confirmed: boolean;

  @IsNotEmpty()
  @IsString()
  image_url: string;
}

export class ReadCompleteMeasurementDto {
  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeasureDto)
  measures: MeasureDto[];
}
