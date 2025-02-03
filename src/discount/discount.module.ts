// src/discount/discount.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountService } from './discount.service'; 
import { DiscountController } from './discount.controller'; 
import { Discount } from './discount.entity'; 
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discount]),
  ProductModule,], 
  providers: [DiscountService], 
  controllers: [DiscountController],
  exports: [DiscountService], 
})
export class DiscountModule {}
