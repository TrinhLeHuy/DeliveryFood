import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User }    from '../users/user.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => User) 
  @JoinColumn({ name: 'userId' })
  user: User;

  // @Column('simple-json')
  // items: { productId: number; quantity: number }[]; chuyển sang sử dụng order-item

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true, // nếu muốn lưu order và order_items cùng lúc
  })
  items: OrderItem[];
  
  @Column('decimal') total: number;
  @Column({ type: 'enum', enum: ['pending','delivered'], default: 'pending' })
  status: 'pending' | 'delivered';
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
