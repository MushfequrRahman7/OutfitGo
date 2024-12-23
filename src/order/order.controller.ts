// src/order/order.controller.ts
import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('admin/orders') 
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Get a specific order by ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  // Update order status
  @Put(':id')
  updateStatus(
    @Param('id') id: number,
    @Body() updateData: { status: string },
  ): Promise<Order> {
    return this.orderService.updateStatus(id, updateData.status);
  }

  
  @Post() 
  async create(@Body() orderData: { customerId: number; totalPrice: number; productList: string; status: string }): Promise<Order> {
    return this.orderService.createOrder(orderData); 
  }
}
