import { AuthLoginDTO } from '../dto/auth-login.dto';

/**
 * @param authLoginDTO AuthLoginDto
 */
export class LoginUserCommand {
  constructor(public readonly authLoginDTO: AuthLoginDTO) {}
}
