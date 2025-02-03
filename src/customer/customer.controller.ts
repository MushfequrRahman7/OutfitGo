// src/customer/customer.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { Customer } from './customer.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('admin/customers')
// @UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('history')
  async getCustomerHistory() {
    return this.customerService.getCustomerHistory();
  }
  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAllCustomers();
  }

  @Get(':id')
  async getCustomer(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findCustomerById(id);
  }

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
