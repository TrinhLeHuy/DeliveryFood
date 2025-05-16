import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { Product } from '../products/product.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>, // Inject OrderRepository
    @InjectRepository(Product) private productsRepository: Repository<Product>, // Inject ProductRepository
    @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>, // Inject OrderItemRepository
    private prodSvc: ProductsService,
    private userSvc: UsersService,
  ) {}

  async create(userId: number, items: { productId: number; quantity: number }[]) {
    const user = await this.userSvc.findById(userId);
    if (!user) throw new NotFoundException('User not found');
  
    let total = 0;
    const orderItems: OrderItem[] = [];
  
    for (const item of items) {
      const product = await this.productsRepository.findOneBy({ id: item.productId });
      if (!product) throw new NotFoundException(`Product ${item.productId} not found`);
  
      // Kiểm tra tồn kho
      if (product.quantity < item.quantity) {
        throw new Error(`Sản phẩm "${product.name}" không đủ số lượng trong kho`);
      }
  
      // Trừ tồn kho
      product.quantity -= item.quantity;
      await this.productsRepository.save(product);
  
      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        price: product.price, // giá tại thời điểm đặt hàng
      });
  
      orderItems.push(orderItem);
  
      total += +product.price * item.quantity;
    }
  
    const order = this.ordersRepository.create({
      user,
      items: orderItems,
      total,
    });
  
    return this.ordersRepository.save(order); // do có cascade nên sẽ lưu cả orderItems
  }
  

  findByUser(userId: number) {
    return this.ordersRepository.find({ where: { user: { id: userId } } });
  }
}