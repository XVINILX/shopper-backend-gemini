import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetUserByIdQuery } from './find-by-id-user.query';
import { UserService } from 'src/user/user.service';
import { ReadUserDto } from '../dtos/read-user.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private userService: UserService) {}

  async execute(command: GetUserByIdQuery) {
    try {
      const { id } = command;
      const user = await this.userService.findUser(id);

      return <ReadUserDto>{
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
