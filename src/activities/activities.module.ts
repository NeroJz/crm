import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { Lead } from 'src/lead/entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Customer, User, Lead])],
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService
  ],
})
export class ActivitiesModule { }
