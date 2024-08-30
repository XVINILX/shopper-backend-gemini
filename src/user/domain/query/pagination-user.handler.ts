import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationUserQuery } from './pagination-user.query';
import { UserService } from 'src/user/user.service';
import { ListUserDto } from '../dtos/list-user.dto';
import { ReadUserDto } from '../dtos/read-user.dto';

@QueryHandler(PaginationUserQuery)
export class PaginationUserHandler
  implements IQueryHandler<PaginationUserQuery>
{
  constructor(private userService: UserService) {}

  async execute(command: PaginationUserQuery) {
    try {
      const { items, page } = command;
      const users = await this.userService.listAll(items, page);

      return users
        ? <ListUserDto>{
            data: users.map((user) => {
              return <ReadUserDto>{
                email: user.email,
                id: user.id,
                customer_code: user.customer_code,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              };
            }),
            total: users.length,
          }
        : [];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
