import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from 'src/lead/entities/lead.entity';

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService],
  imports: [
    TypeOrmModule.forFeature([
      Lead
    ]),
  ]
})
export class OpportunityModule { }
