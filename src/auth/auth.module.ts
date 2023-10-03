import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.modules';
import { PrismaModule } from 'src/prisma/prisma.modules';

@Module({
  imports: [
    JwtModule.register({ secret: 'SECRETE_KEY_2' }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
