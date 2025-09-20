import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerRepository
      .create({
        ...createCustomerDto
      });

    await this.customerRepository.save(customer);

    return customer;
  }

  async findAll() {
    const customers = await this.customerRepository.find();

    return customers;
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOneBy({ id: id });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return this.customerRepository.delete({ id: id });
  }
}
