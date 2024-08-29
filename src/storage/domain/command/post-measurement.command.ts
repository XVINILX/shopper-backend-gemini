import { CreateRequestMeasurementDto } from 'src/measurement/domain/dtos/create-request-measurement.dto';

export class PostMeasurementeCommand {
  constructor(
    public readonly createMeasurementDto: CreateRequestMeasurementDto,
  ) {}
}
