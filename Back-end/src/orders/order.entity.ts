import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User }    from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => User) 
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('simple-json')
  items: { productId: number; quantity: number }[];

  @Column('decimal') total: number;
  @Column({ type: 'enum', enum: ['pending','delivered'], default: 'pending' })
  status: 'pending' | 'delivered';
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
