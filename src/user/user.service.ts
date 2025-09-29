import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      username: createUserDto.username,
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      fullName: `${createUserDto.firstName} ${createUserDto.lastName}`,
      passwordHash: passwordHash,
    });

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    if (updateUserDto.password) {
      updateUserDto['passwordHash'] = await bcrypt.hash(updateUserDto.password, 10);
      delete updateUserDto.password;
    }

    // merge the rest of the fields
    Object.assign(user, {
      ...updateUserDto,
      fullName: updateUserDto.firstName && updateUserDto.lastName
        ? `${updateUserDto.firstName} ${updateUserDto.lastName}`
        : user.fullName,
    });

    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    await this.userRepository.remove(user);
    return user;
  }
}
