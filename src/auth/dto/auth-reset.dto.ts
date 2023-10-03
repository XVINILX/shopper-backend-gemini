import { IsEmail, IsJWT } from 'class-validator';

export class AuthResetDto {
  @IsEmail()
  password: string;

  @IsJWT()
  token: string;
}
