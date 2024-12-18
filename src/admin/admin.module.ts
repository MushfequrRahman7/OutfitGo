// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity'; // Import the Admin entity
import { AuthModule } from '../auth/auth.module'; // Import AuthModule if needed
import { CustomerModule } from '../customer/customer.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]), // Import TypeOrmModule for Admin entity
    AuthModule, 
    CustomerModule,
    OrderModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
