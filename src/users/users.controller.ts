import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { Body, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<{ data: Users[] }> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<{ data: Users }> {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{ data: Users }> {
    return this.userService.createUser(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<{ data: Users }> {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<{ data: Users }> {
    return this.userService.updateUser(id, user);
  }
}
