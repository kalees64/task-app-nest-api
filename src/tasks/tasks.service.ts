import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { MongoRepository } from 'typeorm';
import { CreateTaskDto, STATUS } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepo: MongoRepository<Tasks>,
  ) {}

  async getTasks(): Promise<{ data: Tasks[] }> {
    const tasks = await this.tasksRepo.find();
    return { data: tasks };
  }

  async getTask(id: string): Promise<{ data: Tasks }> {
    const task = await this.tasksRepo.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException();
    }

    return { data: task };
  }

  async createTask(task: CreateTaskDto): Promise<{ data: Tasks }> {
    const newTask = this.tasksRepo.create({
      ...task,
      status: STATUS.PENDING,
      description: task.description ?? null,
      assigned_date: task.assigned_date ?? null,
      assigned_to: task.assigned_to ?? null,
      completed_date: null,
      created_by: task.created_by ?? null,
      due_date: task.due_date ?? null,
      priority: task.priority ?? null,
      image: task.image ?? null,
    });

    const createdTask = await this.tasksRepo.save(newTask);

    return { data: createdTask };
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<{ data: Tasks }> {
    const updateTask = await this.tasksRepo.update({ id: id }, task);

    if (!updateTask) {
      throw new NotFoundException();
    }

    const updatedTask = await this.getTask(id);

    return { data: updatedTask.data };
  }

  async deleteTask(id: string): Promise<{ data: Tasks }> {
    const task = await this.getTask(id);

    const deletedTask = await this.tasksRepo.delete({ id: id });

    return { data: task.data };
  }
}
