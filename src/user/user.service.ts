import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './domain/dtos/update-user.dto';
import { UserEntity } from 'src/entities/user.entities';
import { CreateUserDto } from './domain/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * @param patchUser UpdateUserDto - Data to change
   * @param id string - User id
   */

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    try {
      const newPassword = await bcrypt.hash(
        createUser.password,
        await bcrypt.genSalt(),
      );

      createUser.password = newPassword;

      const user = this.userRepository.create(createUser);

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param patchUser UpdateUserDto - Data to change
   * @param id string - User id
   */

  async patchUser(patchUser: UpdateUserDto, id: string): Promise<UserEntity> {
    try {
      const { password, ...data } = patchUser;
      let newPassword = password;

      if (password) {
        newPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      }

      const user = await this.userRepository.update(id, {
        password: newPassword,
        ...data,
      });

      return await this.userRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param search string - Search by nome fantasia
   * @param items number - Quantity of items in that page
   * @param page number - Quantity of pages
   */

  async listAll(items?: number, page?: number) {
    try {
      const userList = await this.userRepository.find();

      if (items && page) {
        const initialSlice = items * page;
        const finalSlice = items * page + items;

        const paginatedUserList = userList.slice(initialSlice, finalSlice);

        return paginatedUserList ? paginatedUserList : [];
      }

      return userList ? userList : [];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param id string - Find User according to his Id
   */
  async findUser(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      return user ? user : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param email string - Find User according to his email
   */
  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      return user ? user : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param id string - Delete User according to id
   * @returns
   */

  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.delete({ id: id });
      const checkUser = await this.userRepository.exist({
        where: { id: id },
      });
      return !checkUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
