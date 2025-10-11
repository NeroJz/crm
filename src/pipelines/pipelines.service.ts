import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { In, Repository } from 'typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment, AssignStateDto } from './dto/assign-stage.dto';
import { Stage } from 'src/stage/entities/stage.entity';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(Pipeline)
    private readonly pipelineRepository: Repository<Pipeline>,
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
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

  async findStages(id: string) {
    let pipeline = await this.pipelineRepository
      .findOne({
        where: { id },
        relations: {
          stages: true
        },
        order: {
          stages: {
            seq: 'asc'
          }
        }
      });

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

  async assign(id: string, assignStageDto: AssignStateDto) {
    let pipeline = await this.pipelineRepository
      .findOneBy({ id });

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found')
    }

    let assignment = assignStageDto.type;

    await this.stageRepository.update(
      { id: In(assignStageDto.stages) },
      { pipeline: assignment === Assignment.ASSIGN ? pipeline : null }
    );

    return this.pipelineRepository
      .findOne({
        where: { id },
        relations: {
          stages: true
        }
      });
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
