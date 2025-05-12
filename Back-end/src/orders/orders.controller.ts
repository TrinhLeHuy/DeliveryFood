import { Controller, Post, Body, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('orders')
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<any> {
    try {
      return await this.svc.create(dto);
    } catch (error) {
      // Handle and log the error appropriately
      throw new Error('Failed to create order: ' + error.message);
    }
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