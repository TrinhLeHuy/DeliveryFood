import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product }         from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    return this.repo.save(dto);
  }

  findAll(category?: string) {
    return category
      ? this.repo.find({ where: { category } })
      : this.repo.find();
  }
}
