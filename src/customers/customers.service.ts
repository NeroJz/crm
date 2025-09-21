import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

  async assign(id: string, updateCustomerDto: UpdateCustomerDto) {
    let customer = await this.customerRepository
      .findOne({
        where: { id },
        relations: []
      });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    let userId = updateCustomerDto.userId!;

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    customer.owner = user;
    await this.customerRepository.update({ id }, customer);

    return { ...customer, owner: customer.owner?.id };
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return this.customerRepository.delete({ id: id });
  }
}
