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
import { ApiQuery } from '@nestjs/swagger';
import { MeasurementType } from 'src/entities/enums/measurement.enum';
import { PaginationMeasurementQuery } from '../domain/query/pagination-measurement.query';

@Controller('')
export class MeasurementConstroller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch('confirm')
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
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
  })
  @ApiQuery({
    name: 'quantityPerPage',
    type: Number,
  })
  async getCustomerList(
    @Param('customercode') customercode: string,
    @Query('measure_type') measure_type: MeasurementType,
    @Query('page') page: number,
    @Query('quantityPerPage') quantityPerPage: number,
  ) {
    return await this.commandBus.execute(
      new PaginationMeasurementQuery(
        customercode,
        measure_type,
        page,
        quantityPerPage,
      ),
    );
  }
}
