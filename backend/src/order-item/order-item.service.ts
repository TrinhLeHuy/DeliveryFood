import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
  ) { }

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const item = this.itemRepo.create(createOrderItemDto);
    return this.itemRepo.save(item);
  }

  findAll(): Promise<OrderItem[]> {
    return this.itemRepo.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return item;
  }
  findByOrder(orderId: number): Promise<OrderItem[]> {
    return this.itemRepo.find({
      where: { order: { id: orderId } },
      relations: ['product', 'order'],
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const item = await this.findOne(id);
    const updated = this.itemRepo.merge(item, updateOrderItemDto);
    return this.itemRepo.save(updated);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
    return { deleted: true };
  }
}
