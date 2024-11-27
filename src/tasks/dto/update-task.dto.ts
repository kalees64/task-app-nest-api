import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRIORITY, STATUS } from './create-task.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  status: STATUS;

  @IsOptional()
  @IsString()
  priority: PRIORITY | null;

  @IsOptional()
  @IsString()
  image: string | null;

  @IsOptional()
  @IsDateString()
  created_at: string;

  @IsNotEmpty()
  @IsDateString()
  modified_at: string;

  @IsOptional()
  @IsDateString()
  assigned_date: string | null;

  @IsOptional()
  @IsDateString()
  completed_date: string | null;

  @IsOptional()
  @IsDateString()
  due_date: string | null;

  @IsOptional()
  @IsString()
  assigned_to: string | null;

  @IsOptional()
  @IsString()
  created_by: string | null;
}
