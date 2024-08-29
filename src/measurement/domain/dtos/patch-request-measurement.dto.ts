import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PatchRequestMeasurementDto {
  @IsInt()
  confirmed_value: number;

  @IsNotEmpty()
  @IsString()
  measure_uuid: string;
}
