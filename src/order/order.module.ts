// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { NotificationModule } from '../notification/notification.module';
import { Customer } from '../customer/customer.entity'; // Import Customer entity
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer]),
  CustomerModule,
  NotificationModule,],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService], 
})
export class OrderModule {}
