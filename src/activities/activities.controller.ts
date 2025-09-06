import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    // return this.activitiesService.create(createActivityDto);
    return {
      msg: 'POST Activities activated'
    };
  }

  @Get()
  findAll() {
    // return this.activitiesService.findAll();
    return {
      msg: 'GET Activities activated'
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.activitiesService.findOne(+id);
    return {
      msg: 'GET Activities by Id activated'
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    // return this.activitiesService.update(+id, updateActivityDto);
    return {
      msg: 'PUT Activities by ID activated'
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.activitiesService.remove(+id);
    return {
      msg: 'DELETE Activities activated'
    };
  }
}
