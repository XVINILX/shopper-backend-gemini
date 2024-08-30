import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpStatus } from '@nestjs/common';

import { PostMeasurementeCommand } from './post-measurement.command';
import { MeasurementService } from 'src/measurement/services/measurement.service';
import { CreateMeasurementDto } from 'src/measurement/domain/dtos/create-measurement.dto';
import { GeminiService } from 'src/measurement/integrations/gemini.service';
import { ReadMeasurementDto } from 'src/measurement/domain/dtos/read-measurement.dto';
import { createHttpException } from 'src/utils/exception.utils';
import { StorageEntity } from 'src/entities/storage.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(PostMeasurementeCommand)
export class PostMeasurementeHandler
  implements ICommandHandler<PostMeasurementeCommand>
{
  constructor(
    @InjectRepository(StorageEntity)
    private storageRepository: Repository<StorageEntity>,
    private measurementService: MeasurementService,
    private geminiService: GeminiService,
  ) {}

  async execute(command: PostMeasurementeCommand): Promise<ReadMeasurementDto> {
    const { createMeasurementDto } = command;

    const check =
      await this.measurementService.checkIfUserHasMeasurementIntThatMonth(
        createMeasurementDto,
      );

    if (check) {
      throw createHttpException(
        {
          error_code: 'DOUBLE_REPORT',
          error_description:
            'A report for this type already exists for the current month',
        },
        HttpStatus.CONFLICT,
      );
    }

    const infosFromGemini =
      await this.geminiService.getInfoFromBase64WithGemini(
        `Please read the attached image of a water bill. Extract the total amount due writen in this bill and provide it in JSON format like this: { "total_amount_due": "XX.XX" }. Do not include any other text or information in the response. Do not use comma to number, use the point`,
        createMeasurementDto.image,
      );
    console.log(infosFromGemini.result.response.text());
    const returnedInfo = JSON.parse(infosFromGemini.result.response.text());
    const transformed = Math.round(Number(returnedInfo.total_amount_due) * 100);

    const storageEntity = await this.storageRepository.create({
      image_url: infosFromGemini.url,
    });

    const createStorageEntity =
      await this.storageRepository.save(storageEntity);

    const measure_datetime = new Date(createMeasurementDto.measure_datetime);

    const createNewMeasurement: CreateMeasurementDto = {
      value: transformed,
      measure_datetime: measure_datetime,
      measure_type: createMeasurementDto.measure_type,
      storage: createStorageEntity.id,
      monthMeasurement: measure_datetime.getMonth(),
      yearMeasurement: measure_datetime.getFullYear(),
    };
    createNewMeasurement.value = transformed;

    const createdMeasurement = await this.measurementService.createMeasurement(
      createNewMeasurement,
      createMeasurementDto.customer_code,
    );

    return <ReadMeasurementDto>{
      image_url: infosFromGemini.url,
      measure_uuid: createdMeasurement.id,
      measure_value: createdMeasurement.value,
    };
  }
}
