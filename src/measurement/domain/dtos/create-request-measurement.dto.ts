import {
  IsBase64,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MeasurementType } from '../../../entities/enums/measurement.enum';
import { Type } from 'class-transformer';

export class CreateRequestMeasurementDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  measure_datetime: Date;

  @IsNotEmpty()
  @IsEnum(MeasurementType)
  measure_type: MeasurementType;
}
