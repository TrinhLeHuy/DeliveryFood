import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { ProductsModule } from '../products/products.module'; // Import ProductsModule
import { UsersModule } from '../users/users.module';
import { OrderItem } from '../order-item/entities/order-item.entity'; // Import OrderItem entity
import { Product } from '../products/product.entity'; // Import Product entity
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), // Cung cấp OrderRepository
    ProductsModule, // Import ProductsModule để sử dụng ProductRepository
    UsersModule,
    TypeOrmModule.forFeature([Order, Product, OrderItem]), // ✅ THÊM OrderItem VÀO ĐÂY
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
