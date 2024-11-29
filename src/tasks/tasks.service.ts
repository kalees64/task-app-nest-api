import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { MongoRepository } from 'typeorm';
import { CreateTaskDto, STATUS } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepo: MongoRepository<Tasks>,
    private userService: UserService,
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
    let createdUser: { data: Users };

    let assignedUser: { data: Users };

    if (task.created_by) {
      createdUser = await this.userService.getUser(task.created_by);
    }

    if (task.assigned_to) {
      assignedUser = await this.userService.getUser(task.assigned_to);
    }

    const newTask = this.tasksRepo.create({
      ...task,
      status: STATUS.PENDING,
      description: task.description ?? null,
      assigned_date: task.assigned_date ?? null,
      assigned_to: task.assigned_to ? assignedUser.data : null,
      completed_date: null,
      created_by: task.created_by ? createdUser.data : null,
      due_date: task.due_date ?? null,
      priority: task.priority ?? null,
      image: task.image ?? null,
    });

    const createdTask = await this.tasksRepo.save(newTask);

    return { data: createdTask };
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<{ data: Tasks }> {
    let assignedUser: { data: Users };

    let existingTaskData: { data: Tasks };

    if (task.assigned_to) {
      assignedUser = await this.userService.getUser(task.assigned_to);
      existingTaskData = await this.getTask(id);
    }
    const updateTask = await this.tasksRepo.update(
      { id: id },
      {
        ...task,
        assigned_to: task.assigned_to
          ? assignedUser.data
          : existingTaskData.data.assigned_to,
      },
    );

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
