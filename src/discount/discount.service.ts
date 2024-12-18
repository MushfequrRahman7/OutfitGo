// src/discount/discount.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discount.entity'; 

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>, 
  ) {}

  // Method to create a new discount
  async create(code: string, percentage: number, expiryDate: string): Promise<Discount> {
    const discount = this.discountRepository.create({ code, percentage, expiryDate });
    return await this.discountRepository.save(discount); 
  }

  // Method to fetch all discounts
  async findAll(): Promise<Discount[]> {
    return await this.discountRepository.find(); 
  }

  // Method to remove a discount by ID
  async remove(id: number): Promise<void> {
    await this.discountRepository.delete(id); 
  }

  // Method to get the active discount (get the first discount)
  async getActiveDiscount(): Promise<Discount | null> {
    
    const activeDiscount = await this.discountRepository.findOne({
      where: {}, 
    });

    return activeDiscount || null; 
  }
}
