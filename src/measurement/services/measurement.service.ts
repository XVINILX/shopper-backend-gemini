import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from 'src/entities/measurement.entities';
import { Between, Repository } from 'typeorm';
import { CreateMeasurementDto } from '../domain/dtos/create-measurement.dto';
import { CreateRequestMeasurementDto } from '../domain/dtos/create-request-measurement.dto';
import { StorageEntity } from 'src/entities/storage.entities';
import { PatchRequestMeasurementDto } from '../domain/dtos/patch-request-measurement.dto';
import { createHttpException } from 'src/utils/exception.utils';
import { MeasurementType } from 'src/entities/enums/measurement.enum';
import { SuccessDto } from 'src/utils/success.dto';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(MeasurementEntity)
    private measurementRepository: Repository<MeasurementEntity>,

    @InjectRepository(StorageEntity)
    private storageRepository: Repository<StorageEntity>,
  ) {}

  async createMeasurement(
    createMeasurement: CreateMeasurementDto,
  ): Promise<MeasurementEntity> {
    try {
      const storageEntity = await this.storageRepository.findOne({
        where: { id: createMeasurement.storage },
      });

      const measurementEntity = this.measurementRepository.create({
        measure_type: createMeasurement.measure_type,
        measure_datetime: createMeasurement.measure_datetime,
        storage: storageEntity,
        monthMeasurement: createMeasurement.monthMeasurement,
        yearMeasurement: createMeasurement.yearMeasurement,
        value: createMeasurement.value,
      });

      return this.measurementRepository.save(measurementEntity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkIfUserHasMeasurementIntThatMonth(
    createMeasurement: CreateRequestMeasurementDto,
  ): Promise<boolean> {
    try {
      const measureDate = new Date(createMeasurement.measure_datetime);
      const month = measureDate.getMonth();
      const year = measureDate.getFullYear();

      const findMeasurement = this.measurementRepository.findOne({
        where: {
          measure_datetime: Between(
            new Date(year, month, 1),
            new Date(year, month + 1, 0),
          ),
          user: { customer_code: createMeasurement.customer_code },
          measure_type: createMeasurement.measure_type,
        },
      });

      return Boolean(findMeasurement);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async listMeasurementByCustomerCode(
    customercode: string,
    measure_type: MeasurementType,
    page: number,
    items: number,
  ): Promise<MeasurementEntity[]> {
    try {
      const skip = (page - 1) * items;
      const take = items;

      const findMeasurement = this.measurementRepository.find({
        where: {
          user: { customer_code: customercode },
          measure_type,
        },
        skip,
        take,
      });

      return findMeasurement;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchMeasurement(
    patcMeasurementDto: PatchRequestMeasurementDto,
  ): Promise<SuccessDto> {
    try {
      const findMeasurementId = await this.measurementRepository.findOne({
        where: { id: patcMeasurementDto.measure_uuid },
      });

      if (!findMeasurementId)
        throw createHttpException(
          {
            error_code: 'MEASURE_NOT_FOUND',
            error_description: 'Leitura não encontrada',
          },
          HttpStatus.NOT_FOUND,
        );

      if (findMeasurementId.confirmed)
        throw createHttpException(
          {
            error_code: 'CONFIRMATION_DUPLICATE',
            error_description: 'Leitura do mês já realizada',
          },
          HttpStatus.CONFLICT,
        );

      const findMeasurement = this.measurementRepository.update(
        {
          id: patcMeasurementDto.measure_uuid,
        },
        { value: patcMeasurementDto.confirmed_value },
      );

      return { success: Boolean(findMeasurement) };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
