import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpStatus } from '@nestjs/common';

import { PostMeasurementeCommand } from './post-measurement.command';
import { MeasurementService } from 'src/measurement/services/measurement.service';
import { CreateMeasurementDto } from 'src/measurement/domain/dtos/create-measurement.dto';
import { GeminiService } from 'src/measurement/integrations/gemini.service';
import { ReadMeasurementDto } from 'src/measurement/domain/dtos/read-measurement.dto';
import { createHttpException } from 'src/utils/exception.utils';

@CommandHandler(PostMeasurementeCommand)
export class PostMeasurementeHandler
  implements ICommandHandler<PostMeasurementeCommand>
{
  constructor(
    private measurementService: MeasurementService,
    private geminiService: GeminiService,
  ) {}

  async execute(command: PostMeasurementeCommand): Promise<ReadMeasurementDto> {
    try {
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
          'Look for the value of this bill and return it like a json, example: {value: 00.12} and nothing else.',
          createMeasurementDto.image,
        );

      const createNewMeasurement = new CreateMeasurementDto();

      const returnedInfo = JSON.parse(infosFromGemini.response.text());
      createNewMeasurement.value = returnedInfo.value;

      const createdMeasurement =
        await this.measurementService.createMeasurement(createNewMeasurement);

      return <ReadMeasurementDto>{
        image_url: returnedInfo.value,
        measure_uuid: createdMeasurement.id,
        measure_value: createdMeasurement.value,
      };
    } catch (error) {
      throw createHttpException(
        {
          error_code: 'DOUBLE_REPORT',
          error_description:
            'A report for this type already exists for the current month',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
