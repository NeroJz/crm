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
    if (user) {
      createActivityDto.user = user;
    }

    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  findAll(@Request() req) {
    const user: User = req.user;
    console.log(user);
    // return this.activitiesService.findAll();
    return {
      userId: user.id,
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
