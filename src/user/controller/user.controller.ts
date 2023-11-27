import { Body, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserDto } from '../domain/dtos/update-user.dto';
import { PatchUserCommand } from '../domain/command/patch-user.command';
import { DeleteUserCommand } from '../domain/command/delete-user.command';
import { ReadUserDto } from '../domain/dtos/read-user.dto';
import { DeleteUserDto } from '../domain/dtos/delete-user.dto';
import { GetUserByIdQuery } from '../domain/query/find-by-id-user.query';

import { PaginationUserQuery } from '../domain/query/pagination-user.query';
import { ListUserDto } from '../domain/dtos/list-user.dto';
import { AuthGuard } from 'src/core/guards/auth.guards';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt')
@ControllerApp('user', 'User')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ReadUserDto,
  })
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Get('items=:items/page=:page')
  @ApiResponse({
    description: 'Searchs an Enterprise By Id',
    type: ListUserDto,
  })
  async ListWithPagination(
    @Param('page') page: number,
    @Param('items') items: number,
  ) {
    return this.queryBus.execute(new PaginationUserQuery(page, items));
  }

  @Patch(':id/')
  @ApiResponse({
    description: 'Update an User',
    type: ReadUserDto,
  })
  async updateByCompleted(
    @Body() patchUser: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.commandBus.execute(new PatchUserCommand(patchUser, id));
  }

  @ApiResponse({
    description: 'Delete an User',
    type: DeleteUserDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
