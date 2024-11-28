import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto, ROLE } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async deleteUser(id: string): Promise<{ data: Users }> {
    const user = await this.getUser(id);

    const deletedUser = await this.usersRepo.delete({ id: id });

    return { data: user.data };
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<{ data: Users }> {
    if (!Object.keys(user).length) {
      throw new BadRequestException();
    }

    const updateUser = await this.usersRepo.update({ id: id }, user);

    if (!updateUser) {
      throw new NotFoundException();
    }

    const updatedUser = await this.getUser(id);

    return { data: updatedUser.data };
  }
}
