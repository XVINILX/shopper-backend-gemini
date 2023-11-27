import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';

/**
 * @param createUserDto CreateUserDto
 */
export class RegisterUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
