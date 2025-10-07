import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { PipelinesModule } from 'src/pipelines/pipelines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stage
    ]),
    PipelinesModule
  ],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule { }
