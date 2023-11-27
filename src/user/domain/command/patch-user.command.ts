import { UpdateUserDto } from '../dtos/update-user.dto';

export class PatchUserCommand {
  constructor(
    public readonly patchUserDto: UpdateUserDto,
    public readonly id: string,
  ) {}
}
