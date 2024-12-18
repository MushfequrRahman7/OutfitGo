// src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Create a new customer
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  // Get all customers
  async findAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  // Get a customer by ID
  async findCustomerById(id: number): Promise<Customer> {
    return this.customerRepository.findOneBy({ id });
  }

  // Update customer data
  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.customerRepository.findOneBy({ id });
  }

  // Delete a customer
  async deleteCustomer(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
