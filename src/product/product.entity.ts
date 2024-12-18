// src/product/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number; 

  @Column('int')
  stockQuantity: number;

  @Column()
  category: string; 

  @Column('decimal', { nullable: true })
  discountedPrice?: number; 
}
