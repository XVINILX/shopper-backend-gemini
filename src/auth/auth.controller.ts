import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {}

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.userService.create(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {}

  @Post('reset')
  async reset(@Body body: AuthResetDto) {
    await this.prisma.user.update({
      data: { ...body },
      where: {
        id,
      },
    });
  }
}
