import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { UserService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Users])],
  providers: [TaskService, UserService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TasksModule {}
