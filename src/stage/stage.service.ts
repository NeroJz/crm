import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Repository } from 'typeorm';
import { Stage } from './entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>
  ) { }

  async create(createStageDto: CreateStageDto) {
    return this.stageRepository.save({ ...createStageDto });
  }

  async findAll() {
    return this.stageRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} stage`;
  }

  async update(id: string, updateStageDto: UpdateStageDto) {
    let stage = await this.stageRepository
      .findOneBy({ id });

    if (!stage) {
      throw new NotFoundException('Stage not found.');
    }

    Object.assign(stage, updateStageDto);

    await this.stageRepository.save(stage);

    return stage;
  }

  async remove(id: string) {
    let stage = await this.stageRepository
      .findOneBy({ id });

    if (!stage) {
      throw new NotFoundException('Stage not found.');
    }

    await this.stageRepository.remove(stage);

    return stage;
  }
}
