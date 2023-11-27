import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { DeleteEnterpriseCommand } from './delete-enteprise.command';

@CommandHandler(DeleteEnterpriseCommand)
export class DeleteEnterpriseHandler
  implements ICommandHandler<DeleteEnterpriseCommand>
{
  constructor(private repository: EnterpriseService) {}

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
