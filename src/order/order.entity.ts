// src/order/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number; 

  @Column('decimal')
  totalPrice: number;

  @Column('text')
  productList: string; 

  @Column({ default: 'pending' })
  status: string; 
}
