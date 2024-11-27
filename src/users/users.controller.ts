import { Controller, Get, Param } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
}
