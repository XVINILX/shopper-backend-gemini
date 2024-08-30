import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PatchRequestMeasurementDto } from '../domain/dtos/patch-request-measurement.dto';
import { PatchMeasurementCommand } from '../domain/command/patch-measurement.command';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { MeasurementType } from 'src/entities/enums/measurement.enum';
import { PaginationMeasurementQuery } from '../domain/query/pagination-measurement.query';
import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';

@ControllerApp('/', '')
export class MeasurementConstroller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch('confirm')
  @ApiBody({
    description: 'Create a new measurement',
    type: PatchRequestMeasurementDto,
    examples: {
      a: {
        summary: 'Example',
        value: {
          confirmed_value: 123456,
          measure_uuid: '',
        },
      },
    },
  })
  async confirmInfo(@Body() patchMeasurementDto: PatchRequestMeasurementDto) {
    return await this.commandBus.execute(
      new PatchMeasurementCommand(patchMeasurementDto),
    );
  }

  @Get(':customercode/list')
  @ApiQuery({
    name: 'measure_type',
    enum: MeasurementType,
    enumName: 'MeasurementType',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'quantityPerPage',
    type: Number,
    required: false,
  })
  async getCustomerList(
    @Param('customercode') customercode: string,
    @Query('measure_type') measure_type: MeasurementType,
    @Query('page') page: number,
    @Query('quantityPerPage') quantityPerPage: number,
  ) {
    return await this.queryBus.execute(
      new PaginationMeasurementQuery(
        customercode,
        measure_type,
        page,
        quantityPerPage,
      ),
    );
  }
}
