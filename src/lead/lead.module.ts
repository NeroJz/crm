import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CustomersModule } from 'src/customers/customers.module';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lead,
      Customer,
      User,
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule { }
