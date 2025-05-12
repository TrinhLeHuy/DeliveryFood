import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Cung cấp ProductRepository
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule], // Xuất ProductsService và TypeOrmModule
})
export class ProductsModule {}