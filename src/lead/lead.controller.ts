import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UserContext } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ConvertOpportunityDto } from './dto/convert-opportunity.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Post()
  create(
    @UserContext() user: User,
    @Body() createLeadDto: CreateLeadDto
  ) {
    return this.leadService.create(createLeadDto, user);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Get(':id/activities')
  findActivities(@Param('id') id: string) {
    return this.leadService.findOneWithActivities(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(id, updateLeadDto);
  }

  @Patch(':id/convert-to-opportunity')
  async convertToOpportunity(
    @Param('id') id: string,
    @Body() convertToOpportunityDto: ConvertOpportunityDto
  ) {
    return this.leadService.updateToOpportunity(id, convertToOpportunityDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
}
