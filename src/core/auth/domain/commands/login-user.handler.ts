import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../auth.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: LoginUserCommand) {
    try {
      const { authLoginDTO } = command;

      const user = await this.authService.login(authLoginDTO);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
