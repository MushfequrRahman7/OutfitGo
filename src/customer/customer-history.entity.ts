import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('customer_history') 
export class CustomerHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalCustomerId: number; 

  @Column()
  customerId: string;

  @Column()
  customerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  purchases: number;

  @Column()
  action: string; 

  @CreateDateColumn()
  createdAt: Date; 
}
