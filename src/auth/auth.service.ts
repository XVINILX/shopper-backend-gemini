import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async createToken() {}
  async checkToken(token: string) {}
  async login(authLoginDTO: AuthLoginDTO) {}
  async forget(authForgetDTO: AuthForgetDTO) {}
}
