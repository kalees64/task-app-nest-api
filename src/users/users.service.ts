import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: MongoRepository<Users>,
  ) {}

  async getUsers(): Promise<{ data: Users[] }> {
    const users = await this.usersRepo.find();

    return { data: users };
  }

  async getUser(id: string): Promise<{ data: Users }> {
    const user = await this.usersRepo.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    return { data: user };
  }
}
