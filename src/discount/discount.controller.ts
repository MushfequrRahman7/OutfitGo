// src/discount/discount.controller.ts
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './discount.entity';

@Controller('admin/discounts') 
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  // Create new discount
  @Post()
  create(@Body() discountData: { code: string; percentage: number; expiryDate: string }): Promise<Discount> {
    return this.discountService.create(discountData.code, discountData.percentage, discountData.expiryDate);
  }

  // Get all discounts
  @Get()
  findAll(): Promise<Discount[]> {
    return this.discountService.findAll(); 
  }

  // Remove discount by ID
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.discountService.remove(id); 
  }
}
