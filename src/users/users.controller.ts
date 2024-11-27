import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{ data: Users }> {
    return this.userService.createUser(user);
  }
}
