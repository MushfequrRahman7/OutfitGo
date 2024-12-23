// src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerHistory } from './customer-history.entity'; 
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerHistory)
    private customerHistoryRepository: Repository<CustomerHistory>, 
  ) {}

  // Create a new customer
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    await this.customerRepository.save(customer);

    // Log action to history
    const history = this.customerHistoryRepository.create({
      originalCustomerId: customer.id,
      customerId: customer.customerId,
      customerName: customer.customerName,
      purchases: customer.purchases,
      action: 'created',
    });
    await this.customerHistoryRepository.save(history);

    return customer;
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
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) throw new Error('Customer not found');

    Object.assign(customer, updateCustomerDto);
    await this.customerRepository.save(customer);

    // Log action to history
    const history = this.customerHistoryRepository.create({
      originalCustomerId: customer.id,
      customerId: customer.customerId,
      customerName: customer.customerName,
      purchases: customer.purchases,
      action: 'updated',
    });
    await this.customerHistoryRepository.save(history);

    return customer;
  }

  // Delete a customer
  async deleteCustomer(id: number): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) throw new Error('Customer not found');

    // Log action to history
    const history = this.customerHistoryRepository.create({
      originalCustomerId: customer.id,
      customerId: customer.customerId,
      customerName: customer.customerName,
      purchases: customer.purchases,
      action: 'deleted',
    });
    await this.customerHistoryRepository.save(history);

    await this.customerRepository.delete(id);
  }

  // Get customer history
  async getCustomerHistory(): Promise<CustomerHistory[]> {
    return this.customerHistoryRepository.find();
  }
}
