import { Body, Post } from '@nestjs/common';
import { AuthLoginDTO } from '../domain/dto/auth-login.dto';
import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../domain/commands/register-user.command';
import { LoginUserCommand } from '../domain/commands/login-user.command';

@ControllerApp('auth', 'Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO) {
    return await this.commandBus.execute(new LoginUserCommand(authLoginDto));
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.commandBus.execute(
      new RegisterUserCommand(createUserDto),
    );
  }
}
