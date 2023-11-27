import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { UserService } from 'src/user/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private userService: UserService) {}

  async execute(command: DeleteUserCommand) {
    try {
      const { id } = command;
      const user = await this.userService.deleteUser(id);

      return { success: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
