import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateMeasurementDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  monthMeasurement: number;

  @IsInt()
  @IsPositive()
  @Min(1900)
  yearMeasurement: number;

  @IsInt()
  @IsPositive()
  value: number;
}
