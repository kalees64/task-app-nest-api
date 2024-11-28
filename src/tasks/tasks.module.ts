import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Users])],
  providers: [TasksService, UsersService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
