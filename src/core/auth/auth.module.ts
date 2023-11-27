import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { UserModule } from 'src/user/user.modules';
import { AuthService } from './auth.service';
import { RegisterUserHandler } from './domain/commands/register-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginUserHandler } from './domain/commands/login-user.handler';
import { ResetUserHandler } from './domain/commands/reset-user.handler';

const CommandHandler = [
  RegisterUserHandler,
  LoginUserHandler,
  ResetUserHandler,
];
@Module({
  imports: [
    JwtModule.register({ secret: String(process.env.JWT_KEY) }),
    forwardRef(() => UserModule),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...CommandHandler],
  exports: [AuthService],
})
export class AuthModule {}
