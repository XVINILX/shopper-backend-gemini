import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetUserCommand } from './reset-user.command';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AuthService } from '../../auth.service';
import { AuthAuthenticateDTO } from '../dto/auth-authenticate.dto';

@CommandHandler(ResetUserCommand)
export class ResetUserHandler implements ICommandHandler<ResetUserCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: ResetUserCommand) {
    try {
      const { authResetDto } = command;

      const user = await this.authService.resetPassword(authResetDto);

      return <AuthAuthenticateDTO>{
        email: user.email,
        accessToken: user.accessToken,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
