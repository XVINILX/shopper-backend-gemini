import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEnterpriseCommand } from './create-animals.command';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(CreateEnterpriseCommand)
export class CreateEnterpriseHandler
  implements ICommandHandler<CreateEnterpriseCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: CreateEnterpriseCommand) {
    try {
      const { createEnterpriseDto } = command;
      const enteprise =
        await this.repository.createEnterprise(createEnterpriseDto);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
