import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ROLE } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string | null;

  @IsOptional()
  @IsString()
  role: ROLE;
}
