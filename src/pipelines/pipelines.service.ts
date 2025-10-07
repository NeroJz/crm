import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Repository } from 'typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(Pipeline)
    private readonly pipelineRepository: Repository<Pipeline>
  ) { }


  async create(createPipelineDto: CreatePipelineDto) {
    let pipeline = await this.pipelineRepository.create({
      ...createPipelineDto
    });

    await this.pipelineRepository.save(pipeline);

    return pipeline;
  }

  async findAll() {
    return this.pipelineRepository.find();
  }

  async findOne(id: string) {
    let pipeline = await this.pipelineRepository
      .findOneBy({ id });

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found')
    }

    return pipeline;
  }

  async update(id: string, updatePipelineDto: UpdatePipelineDto) {
    let pipeline = await this.pipelineRepository
      .findOneBy({ id });

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found')
    }

    Object.assign(pipeline, updatePipelineDto);

    await this.pipelineRepository.save(pipeline);

    return pipeline;
  }

  async remove(id: string) {
    let pipeline = await this.pipelineRepository
      .findOneBy({ id });

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found')
    }

    return this.pipelineRepository.remove(pipeline);
  }
}
