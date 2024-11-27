import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(): Promise<{ data: Users[] }> {
    return this.userService.getUsers();
  }
}
