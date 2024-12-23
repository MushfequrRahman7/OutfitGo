// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity'; 
import { AuthModule } from '../auth/auth.module'; 
import { CustomerModule } from '../customer/customer.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AuthModule, 
    CustomerModule,
    OrderModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
