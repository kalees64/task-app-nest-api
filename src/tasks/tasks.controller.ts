import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

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
