// src/customer/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ unique: true })
  customerId: string; 

  @Column()
  customerName: string; 

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  purchases: number; 
}
