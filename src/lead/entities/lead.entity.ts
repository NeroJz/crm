import { Activity } from 'src/activities/entities/activity.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum LeadType {
  Lead = 'lead',
  Opportunity = 'opportunity'
};

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  email: string;

  @Column({
    nullable: true
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: LeadType,
    default: LeadType.Lead
  })
  type: string;

  // stage: string;

  @ManyToOne(
    () => Customer,
    {
      nullable: true
    }
  )
  customer: Customer;

  @ManyToOne(
    () => User
  )
  owner: User;

  @OneToMany(
    () => Activity,
    (activity) => activity.lead
  )
  activities: Activity[]
}
