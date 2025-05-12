import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto'; // Sử dụng LoginDto

@Controller('users')
export class UsersController {
  constructor(
    private usersSvc: UsersService,
    private authSvc: AuthService,
  ) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.usersSvc.create(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) { // Sử dụng LoginDto
    return this.authSvc.login(dto);
  }
}