import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';
import { PatchMeasurementCommand } from './patch-measurement.command';
import { MeasurementService } from 'src/measurement/services/measurement.service';
import { SuccessDto } from 'src/utils/success.dto';

@CommandHandler(PatchMeasurementCommand)
export class PatchUserHandler
  implements ICommandHandler<PatchMeasurementCommand>
{
  constructor(private measurementService: MeasurementService) {}

  async execute(command: PatchMeasurementCommand) {
    const { patcMeasurementDto } = command;
    const patchMeasurement =
      await this.measurementService.patchMeasurement(patcMeasurementDto);

    return <SuccessDto>{
      ...patchMeasurement,
    };
  }
}
