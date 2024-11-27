import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum STATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum PRIORITY {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTaskDto {
  id: string;

  @IsNotEmpty()
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
  @IsNotEmpty()
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
