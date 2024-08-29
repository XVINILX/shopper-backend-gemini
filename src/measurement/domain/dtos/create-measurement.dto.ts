import { IsEnum, IsInt, IsNotEmpty, IsDate, IsUUID } from 'class-validator';
import { MeasurementType } from 'src/entities/enums/measurement.enum';

export class CreateMeasurementDto {
  @IsEnum(MeasurementType, {
    message: 'measure_type must be either WATER or GAS',
  })
  @IsNotEmpty({ message: 'measure_type is required' })
  measure_type: MeasurementType;

  @IsDate({ message: 'measure_datetime must be a valid date' })
  @IsNotEmpty({ message: 'measure_datetime is required' })
  measure_datetime: Date;

  @IsUUID('4', { message: 'storage must be a valid UUID' })
  @IsNotEmpty({ message: 'storage is required' })
  storage: string; // UUID as string

  @IsInt({ message: 'monthMeasurement must be an integer' })
  @IsNotEmpty({ message: 'monthMeasurement is required' })
  monthMeasurement: number;

  @IsInt({ message: 'yearMeasurement must be an integer' })
  @IsNotEmpty({ message: 'yearMeasurement is required' })
  yearMeasurement: number;

  @IsInt({ message: 'value must be an integer' })
  @IsNotEmpty({ message: 'value is required' })
  value: number;
}
