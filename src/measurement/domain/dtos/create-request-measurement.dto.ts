import {
  IsBase64,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MeasurementType } from 'src/entities/enums/measurement.enum';

export class CreateRequestMeasurementDto {
  @IsNotEmpty()
  @IsBase64()
  image: string;

  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsNotEmpty()
  @IsDate()
  measure_datetime: Date;

  @IsNotEmpty()
  @IsEnum(MeasurementType)
  measure_type: MeasurementType;
}
