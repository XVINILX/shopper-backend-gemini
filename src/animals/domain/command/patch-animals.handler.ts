import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';

import { PatchEnterpriseCommand } from './patch-animals.command';
import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(PatchEnterpriseCommand)
export class PatchEnterpriseHandler
  implements ICommandHandler<PatchEnterpriseCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: PatchEnterpriseCommand) {
    try {
      const { patchEnterpriseDto, id } = command;
      const enteprise = await this.repository.patchEnterprise(
        patchEnterpriseDto,
        id,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
