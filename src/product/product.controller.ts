// src/product/product.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import * as fastcsv from 'fast-csv';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('admin/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Endpoint to export products to CSV
  @Get('export/csv')
  async exportToCSV(@Res() res: Response) {
    const products = await this.productService.getAllProducts();

    const ws = fs.createWriteStream('products.csv'); // Create a write stream

    fastcsv
      .write(products, { headers: true }) // Write products to CSV
      .pipe(ws); // Pipe the data to the file

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    
    // Send the file as the response
    ws.on('finish', () => {
      res.download('products.csv', 'products.csv', () => {
        fs.unlinkSync('products.csv'); // Remove the file after download
      });
    });
  }
  
  @Post()
  create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
