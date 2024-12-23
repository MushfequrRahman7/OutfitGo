// src/discount/discount.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string; 

  @Column('decimal')
  percentage: number; 

  @Column('date')
  expiryDate: string; 
}
