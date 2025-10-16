import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead, LeadType } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Pipeline } from 'src/pipelines/entities/pipeline.entity';
import { ConvertOpportunityDto } from './dto/convert-opportunity.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,

    @InjectRepository(User)
    private readonly userRespository: Repository<User>,

    @InjectRepository(Pipeline)
    private readonly pipelineRepository: Repository<Pipeline>
  ) { }

  async create(createLeadDto: CreateLeadDto, user: User) {
    let lead = await this.leadRepository
      .create({
        ...createLeadDto,
        owner: user
      });

    const { pipelineId } = createLeadDto;
    if (pipelineId) {
      const pipeline = await this.pipelineRepository
        .findOneBy({ id: pipelineId });

      if (!pipeline) {
        throw new NotFoundException('Pipeline not found. Unable assign the lead to the pipeline.');
      }

      lead.pipeline = pipeline;
    }

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

  async updateToOpportunity(id: string, convertOpportunityDto: ConvertOpportunityDto) {
    let lead = await this.leadRepository
      .findOneBy({ id });

    if (!lead) {
      throw new NotFoundException('Lead not found.');
    }

    let pipeline = await this.pipelineRepository
      .findOneBy({ id: convertOpportunityDto.pipelineId });

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found. Unable to update the lead to opportunity.');
    }

    if (!lead.pipeline) {
      lead.pipeline = pipeline;
    }

    if (lead.pipeline.id !== pipeline.id) {
      throw new NotFoundException('The pipeline id is unmatched with the current lead. Unable to convert to opportunity.');
    }

    lead.type = LeadType.Opportunity;

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
