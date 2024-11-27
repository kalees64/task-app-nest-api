import { Injectable } from '@nestjs/common';
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
}
