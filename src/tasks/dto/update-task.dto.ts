import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRIORITY, STATUS } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  status: STATUS;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  priority: PRIORITY | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image: string | null;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true })
  modified_at: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  assigned_date: string | null;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  completed_date: string | null;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  due_date: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  assigned_to: string | null;
}
