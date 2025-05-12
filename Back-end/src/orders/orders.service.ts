import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>, // Inject OrderRepository
    @InjectRepository(Product) private productsRepository: Repository<Product>, // Inject ProductRepository
    private prodSvc: ProductsService,
    private userSvc: UsersService,
  ) {}

  async create(dto: CreateOrderDto) {
    const user = await this.userSvc.findByEmail(dto.userId.toString());
    if (!user) throw new NotFoundException('User not found');

    let total = 0;
    for (const item of dto.items) {
      const product = await this.productsRepository.findOneBy({ id: item.productId });
      if (!product) throw new NotFoundException(`Product ${item.productId} not found`);
      total += +product.price * item.quantity;
    }

    const order = this.ordersRepository.create({ user, items: dto.items, total });
    return this.ordersRepository.save(order);
  }

  findByUser(userId: number) {
    return this.ordersRepository.find({ where: { user: { id: userId } } });
  }
}