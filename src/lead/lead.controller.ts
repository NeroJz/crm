import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UserContext } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

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
    return this.leadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
