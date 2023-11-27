import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HttpException, HttpStatus } from '@nestjs/common';
import { PatchUserCommand } from './patch-user.command';
import { UserService } from 'src/user/user.service';
import { ReadUserDto } from '../dtos/read-user.dto';

@CommandHandler(PatchUserCommand)
export class PatchUserHandler implements ICommandHandler<PatchUserCommand> {
  constructor(private userService: UserService) {}

  async execute(command: PatchUserCommand) {
    try {
      const { patchUserDto, id } = command;
      const user = await this.userService.patchUser(patchUserDto, id);

      return <ReadUserDto>{
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
