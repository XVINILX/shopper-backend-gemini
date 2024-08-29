import { PatchRequestMeasurementDto } from '../dtos/patch-request-measurement.dto';

export class PatchMeasurementCommand {
  constructor(public readonly patcMeasurementDto: PatchRequestMeasurementDto) {}
}
