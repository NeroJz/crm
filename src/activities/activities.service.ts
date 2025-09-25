import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) { }

  async create(createActivityDto: CreateActivityDto, user: User) {

    let customer = await this.customerRepository.findOneBy({ id: createActivityDto.customer_id });

    if (!customer) {
      throw new NotFoundException(`Customer (${createActivityDto.customer_id}) not found`);
    }

    let activity = await this.activityRepository.create({
      ...createActivityDto
    });

    activity.user = user;
    activity.customer = customer;

    await this.activityRepository.save(activity);

    return { ...activity, customer: customer.id, user: user.id };
  }

  findAll() {
    return `This action returns all activities`;
  }

  async findOne(id: string) {
    let activity = await this.activityRepository.findOneBy({ id: id });

    if (!activity) {
      throw new NotFoundException(`Activity with ${id} not found`);
    }

    return activity;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
