import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>, // Inject UserRepository
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async validate(email: string, pass: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException();
    const ok = await bcrypt.compare(pass, user.password);
    if (!ok) throw new UnauthorizedException();
    const { password, ...rest } = user;
    return rest;
  }

  async login(dto: LoginDto) {
    // ... xác thực ...
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });
    // ... kiểm tra mật khẩu ...
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = this.jwtService.sign(payload);
    return {
        access_token,
        username: user.username,
        role: user.role,
    };
  }

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.save({ ...dto, password: hashed });
    return user;
  }
}
