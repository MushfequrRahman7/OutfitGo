// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private notificationService: NotificationService,
  ) {}

  // Method to create a new order
  async createOrder(orderData: { customerId: number; totalPrice: number; productList: string; status: string }): Promise<Order> {
    const order = this.orderRepository.create(orderData);

    const savedOrder = await this.orderRepository.save(order);

    return savedOrder; 
  }
  
  // Fetch all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find(); 
  }

  // Fetch one order by id
  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  // Update order status
  async updateStatus(id: number, status: string): Promise<Order> {
    await this.orderRepository.update(id, { status });
    return await this.orderRepository.findOne({
      where: { id },
    });
  }
}
