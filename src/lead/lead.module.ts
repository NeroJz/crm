import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Stage } from 'src/stage/entities/stage.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lead,
      Customer,
      User,
      Stage
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule { }
