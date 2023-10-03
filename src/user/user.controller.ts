import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePutUserDto } from './dtos/update-put-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptor/log.interceptor';
@UseInterceptors(LogInterceptor)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserList() {
    return this.userService.listUser();
  }

  @Get('/id:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Put('/id:id')
  async putUser(
    @Body() updatePutUser: UpdatePutUserDto,
    @Param('id') id: string,
  ) {
    await this.exists(id);
    return this.userService.update(id, updatePutUser);
  }

  @Delete('/id:id')
  async deleteUser(@Param('id') id: string) {
    await this.exists(id);
    return this.userService.deleteUser(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  async exists(id: string) {
    if (!(await this.getUser(id))) {
      throw new NotFoundException(`O Usuário ${id} não existe`);
    }
  }
}
