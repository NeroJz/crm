import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { AssignStateDto } from './dto/assign-stage.dto';

@Controller('pipelines')
export class PipelinesController {
  constructor(private readonly pipelinesService: PipelinesService) { }

  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  @Get()
  findAll() {
    return this.pipelinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelinesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipelineDto: UpdatePipelineDto) {
    return this.pipelinesService.update(id, updatePipelineDto);
  }

  @Patch(':id/assign')
  assign(
    @Param('id') id: string,
    @Body() assignStageDto: AssignStateDto
  ) {
    return this.pipelinesService.assign(id, assignStageDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelinesService.remove(id);
  }
}
