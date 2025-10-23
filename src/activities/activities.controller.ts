import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/users/entities/user.entity';
import { UserContext } from 'src/decorators/user.decorator';
import { AssignLeadActivityDto } from './dto/assign-lead-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  create(
    @UserContext() user: User,
    @Body() createActivityDto: CreateActivityDto
  ) {

    return this.activitiesService.create(createActivityDto, user);
  }

  @Get()
  findAll(@Request() req) {
    const user: User = req.user;
    // console.log(user);
    return this.activitiesService.findAll();
  }

  @Get('lead/:leadId')
  findAllByLeadId(@Param('leadId') leadId: string) {
    return this.activitiesService.findByLeadId(leadId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @UserContext() user: User,
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto
  ) {
    return this.activitiesService.update(id, updateActivityDto, user);
  }

  @Patch(':id/lead')
  assignLead(@Param("id") id: string, @Body() assignLeadActivityDto: AssignLeadActivityDto) {
    return this.activitiesService.assignLead(id, assignLeadActivityDto);
  }

  @Delete(':id')
  remove(
    @UserContext() user: User,
    @Param('id') id: string
  ) {
    return this.activitiesService.remove(id, user.id);
  }
}
