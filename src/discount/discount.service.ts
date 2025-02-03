// src/discount/discount.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discount.entity'; 
import { Product } from '../product/product.entity';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>, 
    
    @InjectRepository(Product)  // Inject Product Repository
    private productRepository: Repository<Product>, 
  ) {}
  // Method to update all product prices based on discount
  async applyDiscountToProducts(): Promise<void> {
    const activeDiscount = await this.getActiveDiscount();
    const products = await this.productRepository.find();

    for (const product of products) {
      if (activeDiscount) {
        product.discountedPrice = product.price - (product.price * activeDiscount.percentage) / 100;
      } else {
        product.discountedPrice = null; // Remove discount if no active discount exists
      }

      await this.productRepository.save(product);
    }
  }


  // Method to create a new discount
  async create(code: string, percentage: number, expiryDate: string): Promise<Discount> {
    const discount = this.discountRepository.create({ code, percentage, expiryDate });
    const savedDiscount = await this.discountRepository.save(discount);
  
    // Apply the discount to all products in the database
    await this.applyDiscountToProducts();
  
    return savedDiscount;
  }

  // Method to fetch all discounts
  async findAll(): Promise<Discount[]> {
    return await this.discountRepository.find(); 
  }

  // Method to remove a discount by ID
  async remove(id: number): Promise<void> {
    await this.discountRepository.delete(id);
  
    // Recalculate the discounted price after removal
    await this.applyDiscountToProducts();
  }

  // Method to get the active discount (get the first discount)
  async getActiveDiscount(): Promise<Discount | null> {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  
    const activeDiscount = await this.discountRepository.findOne({
      where: { expiryDate: MoreThanOrEqual(currentDate) }, // Fetch only non-expired discounts
      order: { expiryDate: "ASC" }, // Pick the nearest expiry date discount
    });
  
    return activeDiscount || null;
  }
}
