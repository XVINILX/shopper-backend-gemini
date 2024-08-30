import { JwtService } from '@nestjs/jwt';

import { AuthLoginDTO } from './domain/dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './domain/dto/auth-register.dto';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthAuthenticateDTO } from './domain/dto/auth-authenticate.dto';
import { AuthResetDto } from './domain/dto/auth-reset.dto';
import { generateCustomerCode } from 'src/utils/generate-customer-code';
@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const initialUserEmail = 'admin@example.com';
    const initialUserPassword = 'Admin@123';

    const existingUser =
      await this.userService.findUserByEmail(initialUserEmail);

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(initialUserPassword, 10);

      const initialUser: CreateUserDto = {
        email: initialUserEmail,
        password: hashedPassword,
      };

      let customeDontExist = true;
      const maxTries = 5;
      let quantityTries = 0;
      let customerCode = '';
      while (customeDontExist || quantityTries < maxTries) {
        customerCode = generateCustomerCode();

        const userByCustomerCode =
          await this.userService.findCustomerCode(customerCode);
        quantityTries++;

        if (!userByCustomerCode) customeDontExist = false;
      }

      await this.userService.createUser(initialUser, customerCode);
      console.log(`Initial user with email ${initialUserEmail} created.`);
    } else {
      console.log(`User with email ${initialUserEmail} already exists.`);
    }
  }

  async createToken(user: CreateUserDto, id: string) {
    return {
      access_token: this.jwtService.sign(
        {
          sub: id,
          email: user.email,
        },
        {
          expiresIn: '7 days',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const finalToken = token.split(' ');

      const user = this.jwtService.decode(finalToken[1]);

      return (await this.userService.findUser(user.sub)) ? true : false;
    } catch (error) {
      return false;
    }
  }

  async login(authLoginDTO: AuthLoginDTO) {
    try {
      const { email, password } = authLoginDTO;

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException('E-mail not found', HttpStatus.BAD_REQUEST);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new HttpException(`Invalid password`, HttpStatus.BAD_REQUEST);
      }

      const authToken = await this.createToken(authLoginDTO, user.id);

      return <AuthAuthenticateDTO>{
        email: authLoginDTO.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(data: CreateUserDto) {
    try {
      let customeDontExist = true;
      const maxTries = 5;
      let quantityTries = 0;
      let customerCode = '';
      while (customeDontExist || quantityTries < maxTries) {
        customerCode = generateCustomerCode();

        const userByCustomerCode =
          await this.userService.findCustomerCode(customerCode);
        quantityTries++;

        if (!userByCustomerCode) customeDontExist = false;
      }

      const newUser = await this.userService.createUser(data, customerCode);

      const authToken = await this.createToken(data, newUser.id);

      return <AuthRegisterDTO>{
        email: newUser.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(updateAuthDto: AuthResetDto) {
    try {
      const newUser = await this.userService.patchUser(
        { ...updateAuthDto },
        updateAuthDto.id,
      );

      const authToken = await this.createToken(newUser, newUser.id);

      return <AuthRegisterDTO>{
        email: newUser.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
