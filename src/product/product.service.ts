// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity'; 
import { DiscountService } from '../discount/discount.service'; 

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, 
    private discountService: DiscountService, 
  ) {}

  // Method to calculate discounted price dynamically
  private async calculateDiscountedPrice(product: Product): Promise<number | null> {
    if (!product || !product.price) {
      return null;
    }
  
    const discount = await this.discountService.getActiveDiscount();
  
    if (discount) {
      return product.price - (product.price * discount.percentage) / 100;
    }
  
    return null; 
  }
  

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
  
    const discountedPrice = await this.calculateDiscountedPrice(product);
    if (discountedPrice !== null) {
      product.discountedPrice = discountedPrice;
    }
  
    return await this.productRepository.save(product);
  }
  

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
  
    return Promise.all(
      products.map(async (product) => {
        const discountedPrice = await this.calculateDiscountedPrice(product);
        if (discountedPrice !== null) {
          product.discountedPrice = discountedPrice;
        } else {
          delete product.discountedPrice; 
        }
        return product;
      }),
    );
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      const discountedPrice = await this.calculateDiscountedPrice(product);
      if (discountedPrice !== null) {
        product.discountedPrice = discountedPrice;
      } else {
        delete product.discountedPrice; 
      }
    }
    return product;
  }
  

  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, updateData);
    const updatedProduct = await this.productRepository.findOne({ where: { id } });
  
    if (updatedProduct) {
      const discountedPrice = await this.calculateDiscountedPrice(updatedProduct);
      if (discountedPrice !== null) {
        updatedProduct.discountedPrice = discountedPrice;
      } else {
        delete updatedProduct.discountedPrice; 
      }
      await this.productRepository.save(updatedProduct);
    }
  
    return updatedProduct;
  }
  

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
