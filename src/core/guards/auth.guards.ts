import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { authorization } = context.switchToHttp().getRequest().headers;

      const status = await this.authService.checkToken(authorization);

      return status;
    } catch (error) {
      return false;
    }
  }
}
