import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get()
  async getTasks(): Promise<{ data: Tasks[] }> {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<{ data: Tasks }> {
    return this.tasksService.getTask(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<{ data: Tasks }> {
    return this.tasksService.createTask(task);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<{ data: Tasks }> {
    return this.tasksService.updateTask(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<{ data: Tasks }> {
    return this.tasksService.deleteTask(id);
  }
}
