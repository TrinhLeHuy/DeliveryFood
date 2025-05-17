import { Controller, Post, Body, Get, Param, UseGuards, ParseIntPipe, Req  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { Request } from 'express';
@Controller('orders')
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() dto: CreateOrderDto): Promise<any> {
    const user = req.user as any;
    const userId = user.userId; // ✅ Lấy đúng từ validate(), sửa lại lấy đúng userId
   
    return await this.svc.create(userId, dto.items);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findByUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return await this.svc.findByUser(id);
    } catch (error) {
      // Handle and log the error appropriately
      throw new Error('Failed to find orders for user: ' + error.message);
    }
  }
}