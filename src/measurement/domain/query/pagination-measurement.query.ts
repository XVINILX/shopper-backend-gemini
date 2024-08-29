import { MeasurementType } from 'src/entities/enums/measurement.enum';

/**
 * @param page number - Number of pagination
 * @param items number - Quantity of items in that page
 */
export class PaginationMeasurementQuery {
  constructor(
    public readonly customercode: string,
    public readonly measure_type: MeasurementType,
    public readonly page: number,
    public readonly items: number,
  ) {}
}
