// src/admin/admin.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service'; 
import { OrderService } from '../order/order.service'; 
import { LoginDto } from './login.dto'; 

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService, 
    private readonly orderService: OrderService, 
  ) {}

  
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    const isValid = await this.adminService.validateAdminCredentials(loginDto.adminId, loginDto.password);

    if (!isValid) {
      throw new HttpException('Invalid admin ID or password', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(loginDto.adminId);
  }

  
  @Get('orders')
  async getAllOrders() {
    return await this.orderService.findAll(); 
  }

  
  @Put('orders/:id')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateData: { status: string }, 
  ) {
    return await this.orderService.updateStatus(id, updateData.status); 
  }
}
