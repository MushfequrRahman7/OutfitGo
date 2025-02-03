// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { DiscountService } from '../discount/discount.service'; 

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, 
    private discountService: DiscountService, 
  ) {}
  async importProductsFromCSV(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const products: Partial<Product>[] = [];

      fs.createReadStream(filePath)
        .pipe(fastcsv.parse({ headers: true }))
        .on('data', (row) => {
          products.push({
            name: row.name,
            description: row.description,
            price: parseFloat(row.price),
            stockQuantity: parseInt(row.stockQuantity),
            category: row.category,
            discountedPrice: row.discountedPrice ? parseFloat(row.discountedPrice) : null,
          });
        })
        .on('end', async () => {
          await this.productRepository.save(products);
          fs.unlinkSync(filePath); // Delete file after import
          resolve('CSV file imported successfully');
        })
        .on('error', (error) => {
          reject(`Failed to import CSV: ${error.message}`);
        });
    });
  }

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
    // Create the product object
    const product = this.productRepository.create(productData);
  
    // Calculate the discounted price
    const discountedPrice = await this.calculateDiscountedPrice(product);
    product.discountedPrice = discountedPrice ?? null; // Ensure null is saved if no discount exists
  
    // Save the product in the database
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
    const existingProduct = await this.productRepository.findOne({ where: { id } });
  
    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }
  
    // Merge new data with existing product
    const updatedProduct = { ...existingProduct, ...updateData };
  
    // Get active discount and apply if exists
    const activeDiscount = await this.discountService.getActiveDiscount();
    if (activeDiscount) {
      updatedProduct.discountedPrice = updatedProduct.price - (updatedProduct.price * activeDiscount.percentage) / 100;
    } else {
      updatedProduct.discountedPrice = null;
    }
  
    return await this.productRepository.save(updatedProduct);
  }
  
  
  

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductDistribution() {
    const products = await this.productRepository.find();
    const distribution = {};
  
    // Calculate total stock for each category
    products.forEach((product) => {
      if (distribution[product.category]) {
        distribution[product.category] += product.stockQuantity; // Count by stock
      } else {
        distribution[product.category] = product.stockQuantity; // Initialize category count
      }
    });
  
    return distribution;
  }
  
}
