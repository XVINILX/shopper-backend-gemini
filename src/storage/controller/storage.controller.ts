import { Body, Post, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { PostMeasurementeCommand } from '../domain/command/post-measurement.command';
import { CreateRequestMeasurementDto } from 'src/measurement/domain/dtos/create-request-measurement.dto';
import { ValidationExceptionFilter } from 'src/core/exceptionFilter/bad-request-exception.filter';

@ControllerApp('/', '')
@UseFilters(new ValidationExceptionFilter())
export class StorageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('upload')
  async uploadMeasurement(
    @Body() createMeasurementDto: CreateRequestMeasurementDto,
  ) {
    return await this.commandBus.execute(
      new PostMeasurementeCommand(createMeasurementDto),
    );
  }
}
