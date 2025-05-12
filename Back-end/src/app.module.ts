import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // mật khẩu XAMPP mặc định là rỗng
      database: 'delivery_food_db',
      autoLoadEntities: true,
      synchronize: true, // chỉ dùng phát triển, KHÔNG dùng production
    }),
    UsersModule,
  ],
})
export class AppModule {}
