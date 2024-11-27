import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto, ROLE } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  async createUser(user: CreateUserDto): Promise<{ data: Users }> {
    const findUser = await this.usersRepo.findOneBy({ email: user.email });

    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    // const salt = await bcrypt.genSalt();

    // const hashedPassword = await bcrypt.hash(user.password, salt);

    const addUser = this.usersRepo.create({
      ...user,
      role: ROLE.USER,
      password: user.password ?? null,
    });

    const newUser = await this.usersRepo.save(addUser);

    return { data: newUser };
  }
}
