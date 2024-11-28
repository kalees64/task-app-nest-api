import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ROLE } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
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
