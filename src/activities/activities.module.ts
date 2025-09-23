import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { APP_GUARD } from '@nestjs/core';
import { IdentityAuthGuard } from 'src/auth/strategies/identity.strategy';

@Module({
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService
  ],
})
export class ActivitiesModule { }
