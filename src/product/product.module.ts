// src/product/product.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service'; 
import { ProductController } from './product.controller'; 
import { Product } from './product.entity'; 
import { DiscountModule } from '../discount/discount.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), 
    forwardRef(() => DiscountModule),
  ],
  providers: [ProductService], 
  controllers: [ProductController], 
  exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}
