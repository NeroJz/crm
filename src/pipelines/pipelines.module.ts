import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { Stage } from 'src/stage/entities/stage.entity';
import { Lead } from 'src/lead/entities/lead.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pipeline,
      Stage,
      Lead
    ]),
  ],
  controllers: [PipelinesController],
  providers: [PipelinesService],
})
export class PipelinesModule { }
