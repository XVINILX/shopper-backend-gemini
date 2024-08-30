import { Body, Post, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ControllerApp } from '../../core/decorators/controller-apitag.decorators';
import { PostMeasurementeCommand } from '../domain/command/post-measurement.command';
import { CreateRequestMeasurementDto } from '../../measurement/domain/dtos/create-request-measurement.dto';
import { ValidationExceptionFilter } from '../../core/exceptionFilter/bad-request-exception.filter';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CustomErrorResponse } from 'src/utils/error-response.dto';

@ControllerApp('/', '')
@UseFilters(new ValidationExceptionFilter())
export class StorageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('upload')
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: CustomErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: CustomErrorResponse,
  })
  @ApiBody({
    description: 'Create a new measurement',
    type: CreateRequestMeasurementDto,
    examples: {
      a: {
        summary: 'Example with WATER type',
        value: {
          image:
            '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',
          customer_code: '12345',
          measure_datetime: '2024-08-30T12:34:56Z',
          measure_type: 'WATER',
        },
      },
      b: {
        summary: 'Example with GAS type',
        value: {
          image: 'anotherbase64encodedimagestring',
          customer_code: '67890',
          measure_datetime: '2024-08-30T12:34:56Z',
          measure_type: 'GAS',
        },
      },
    },
  })
  async uploadMeasurement(
    @Body() createMeasurementDto: CreateRequestMeasurementDto,
  ) {
    return await this.commandBus.execute(
      new PostMeasurementeCommand(createMeasurementDto),
    );
  }
}
