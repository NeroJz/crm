import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead, LeadType } from 'src/lead/entities/lead.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>
  ) { }

  async findAll() {
    return this.leadRepository.find({
      where: {
        type: LeadType.Opportunity
      },
      relations: [
        'stage',
        'pipeline',
        'activities'
      ]
    });
  }

  async findOne(id: string) {
    return this.leadRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOpportunityDto: UpdateOpportunityDto) {
    return `This action updates a #${id} opportunity`;
  }

  async remove(id: number) {
    return `This action removes a #${id} opportunity`;
  }
}
