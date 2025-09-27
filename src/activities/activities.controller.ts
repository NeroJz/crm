import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  create(
    @Request() req,
    @Body() createActivityDto: CreateActivityDto
  ) {
    const user: User = req.user;

    return this.activitiesService.create(createActivityDto, user);
  }

  @Get()
  findAll(@Request() req) {
    const user: User = req.user;
    // console.log(user);
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    // return this.activitiesService.update(+id, updateActivityDto);
    return {
      msg: 'PUT Activities by ID activated'
    };
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('id') id: string
  ) {
    const user: User = req.user;
    return this.activitiesService.remove(id, user.id);
  }
}
