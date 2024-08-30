import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationMeasurementQuery } from './pagination-measurement.query';
import { MeasurementService } from 'src/measurement/services/measurement.service';
import {
  MeasureDto,
  ReadCompleteMeasurementDto,
} from '../dtos/read-measurement.dto';

@QueryHandler(PaginationMeasurementQuery)
export class PaginationUserHandler
  implements IQueryHandler<PaginationMeasurementQuery>
{
  constructor(private measurementService: MeasurementService) {}

  async execute(command: PaginationMeasurementQuery) {
    try {
      const { items, page, customercode, measure_type } = command;
      const measurements =
        await this.measurementService.listMeasurementByCustomerCode(
          customercode,
          measure_type,
          items,
          page,
        );

      return measurements
        ? <ReadCompleteMeasurementDto>{
            customer_code: customercode,
            measures: measurements.map((measurement) => {
              return <MeasureDto>{
                measure_uuid: measurement.id,
                measure_datetime: measurement.measure_datetime,
                measure_type: measurement.measure_type,
                has_confirmed: measurement.confirmed,
                image_url: measurement.storage.image_url,
              };
            }),
            total: measurements.length,
          }
        : [];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
