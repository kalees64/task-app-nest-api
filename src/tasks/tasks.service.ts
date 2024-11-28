import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { MongoRepository } from 'typeorm';
import { CreateTaskDto, STATUS } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepo: MongoRepository<Tasks>,
    private userService: UsersService,
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
    let getCreatedUser: { data: Users };

    let getAssignedUser: { data: Users };

    if (task.created_by) {
      getCreatedUser = await this.userService.getUser(task.created_by);
    }

    if (task.assigned_to) {
      getAssignedUser = await this.userService.getUser(task.assigned_to);
    }

    const newTask = this.tasksRepo.create({
      ...task,
      status: STATUS.PENDING,
      description: task.description ?? null,
      assigned_date: task.assigned_date ?? null,
      assigned_to: task.assigned_to ? getAssignedUser.data : null,
      completed_date: null,
      created_by: task.created_by ? getCreatedUser.data : null,
      due_date: task.due_date ?? null,
      priority: task.priority ?? null,
      image: task.image ?? null,
    });

    const createdTask = await this.tasksRepo.save(newTask);

    return { data: createdTask };
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<{ data: Tasks }> {
    let getAssignedUser: { data: Users };

    let getExistingTaskData: { data: Tasks };

    if (task.assigned_to) {
      getAssignedUser = await this.userService.getUser(task.assigned_to);
      getExistingTaskData = await this.getTask(id);
    }
    const updateTask = await this.tasksRepo.update(
      { id: id },
      {
        ...task,
        assigned_to: task.assigned_to
          ? getAssignedUser.data
          : getExistingTaskData.data.assigned_to,
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
