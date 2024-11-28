import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true })
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
  created_at: string;

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

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  created_by: string | null;
}
