import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn() id: number;
  @Column()                 name: string;
  @Column('decimal')        price: number;
  @Column()                 imageUrl: string;
  @Column({ nullable: true }) category: string;
  @Column({ type: 'int', default: 0 }) quantity: number;
  
}
