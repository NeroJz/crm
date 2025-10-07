import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipeline } from './entities/pipeline.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pipeline
    ]),
  ],
  controllers: [PipelinesController],
  providers: [PipelinesService],
})
export class PipelinesModule { }
