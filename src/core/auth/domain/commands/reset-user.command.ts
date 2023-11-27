import { AuthResetDto } from '../dto/auth-reset.dto';

/**
 * @param createUserDto CreateUserDto
 */
export class ResetUserCommand {
  constructor(public readonly authResetDto: AuthResetDto) {}
}
