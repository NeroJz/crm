import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) { }

  @Get()
  findAll() {
    return this.opportunityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunityService.update(+id, updateOpportunityDto);
  }
}
