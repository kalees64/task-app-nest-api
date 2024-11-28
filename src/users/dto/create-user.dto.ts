import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  password: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  role: ROLE;
}
