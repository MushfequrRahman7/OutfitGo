// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { NotificationService } from '../notification/notification.service';
import { Customer } from '../customer/customer.entity'; // Import Customer entity


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private notificationService: NotificationService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
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
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new Error('Order not found');

    if (status === 'completed') {
        const customer = await this.customerRepository.findOne({ where: { id: order.customerId } });

        if (!customer) throw new Error('Customer not found');

        // Ensure both values are treated as numbers before addition
        const currentPurchases = Number(customer.purchases) || 0;
        const orderTotal = Number(order.totalPrice) || 0;

        // Correctly update the purchases value
        customer.purchases = parseFloat((currentPurchases + orderTotal).toFixed(2));

        await this.customerRepository.save(customer);
    }

    await this.orderRepository.update(id, { status });
    return await this.orderRepository.findOne({ where: { id } });
}
}