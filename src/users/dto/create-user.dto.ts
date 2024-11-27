import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string | null;

  @IsOptional()
  @IsString()
  role: ROLE;
}
