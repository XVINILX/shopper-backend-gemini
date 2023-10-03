import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dtos/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ email, name, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
  }

  async listUser() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(id: string) {
    try {
      return this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateUserDto: UpdatePutUserDto) {
    return this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
