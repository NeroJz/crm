import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,

    @InjectRepository(User)
    private readonly userRespository: Repository<User>
  ) { }

  async create(createLeadDto: CreateLeadDto, user: User) {
    let lead = await this.leadRepository
      .create({
        ...createLeadDto,
        owner: user
      });

    await this.leadRepository.save(lead);

    return lead;
  }

  async findAll() {
    return this.leadRepository.find();
  }

  async findOne(id: string) {
    let lead = await this.leadRepository.findOneBy({ id });

    if (!lead) {
      throw new NotFoundException('Lead not found.');
    }

    return lead;
  }

  async findOneWithActivities(id: string) {
    let lead = await this
      .leadRepository
      .findOne(
        {
          where: { id },
          relations: {
            activities: true
          }
        }
      );

    if (!lead) {
      throw new NotFoundException('Lead not found.');
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    let lead = await this.leadRepository
      .findOneBy({ id });

    if (!lead) {
      throw new NotFoundException('Lead not found.');
    }

    Object.assign(lead, updateLeadDto);

    return this.leadRepository.save(lead);
  }

  async remove(id: string) {
    let lead = await this.leadRepository.findOneBy({ id });

    if (!lead) {
      throw new NotFoundException('Lead not found.');
    }

    return this.leadRepository.remove(lead);
  }
}
