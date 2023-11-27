import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { PatchEnterpriseCommand } from './patch-enteprise.command';

@CommandHandler(PatchEnterpriseCommand)
export class PatchEnterpriseHandler
  implements ICommandHandler<PatchEnterpriseCommand>
{
  constructor(private repository: EnterpriseService) {}

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
