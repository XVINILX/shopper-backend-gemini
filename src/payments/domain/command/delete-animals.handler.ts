import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { DeleteEnterpriseCommand } from './delete-animals.command';
import { AnimalsService } from 'src/animals/animals.service';

@CommandHandler(DeleteEnterpriseCommand)
export class DeleteEnterpriseHandler
  implements ICommandHandler<DeleteEnterpriseCommand>
{
  constructor(private repository: AnimalsService) {}

  async execute(command: DeleteEnterpriseCommand) {
    try {
      const { id } = command;
      const enteprise = await this.repository.deleteUser(id);

      return { success: enteprise };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
