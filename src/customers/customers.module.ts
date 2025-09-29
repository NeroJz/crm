import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { Activity } from 'src/activities/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Activity])],
  controllers: [CustomersController],
  providers: [
    CustomersService
  ],
})
export class CustomersModule { }
