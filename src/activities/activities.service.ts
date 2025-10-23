import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { AssignLeadActivityDto } from './dto/assign-lead-activity.dto';
import { Lead } from 'src/lead/entities/lead.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
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

  async findAll() {
    let activities = await this.activityRepository.find();
    return activities;
  }

  async findOne(id: string) {
    let activity = await this.activityRepository.findOneBy({ id: id });

    if (!activity) {
      throw new NotFoundException(`Activity with ${id} not found`);
    }

    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto, user: User) {
    let activity = await this.activityRepository
      .findOneBy({ id });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    if (activity.user.id !== user.id) {
      throw new ForbiddenException(`Cannot update an activity that you do not own`);
    }

    Object.assign(activity, updateActivityDto);

    return this.activityRepository.save(activity);
  }

  async assignLead(id: string, assignLeadActivityDto: AssignLeadActivityDto) {
    let activity = await this.activityRepository
      .findOneBy({ id });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    let lead = await this.leadRepository
      .findOneBy({ id: assignLeadActivityDto.lead_id });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    if (lead.owner.id !== activity.user.id) {
      throw new ForbiddenException(`Cannot assign lead that you do not own`);
    }

    activity.lead = lead;

    return this.activityRepository.save(activity);
  }

  async remove(id: string, user_id: string) {
    let activity = await this.activityRepository
      .findOne({
        relations: {
          user: true,
        },
        where: { id }
      });

    if (!activity) {
      throw new NotFoundException('Activity not found.');
    }

    if (activity.user.id !== user_id) {
      throw new ForbiddenException('You are not allowed to delete this activity.');
    }

    return await this.activityRepository.remove(activity);
  }

  async findByLeadId(leadId: string) {
    let activities = await this.activityRepository
      .find({
        where: { lead: { id: leadId } },
        order: { activity_date: 'ASC' }
      });

    return activities;
  }
}
