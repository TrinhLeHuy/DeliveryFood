import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.repo.save({ ...dto, password: hash });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }
  
  
}