import { Customer } from 'src/customers/entities/customer.entity';
import { Lead } from 'src/lead/entities/lead.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ActivityType {
  CALL = 'call',
  MEETING = 'meeting',
  EMAIL = 'email',
  NOTE = 'note'
};

export enum ActivityStatus {
  PLANNED = 'planned',
  DONE = 'done',
  CANCELED = 'canceled'
}

@Entity()
export class Activity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.CALL
  })
  type: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string;

  @ManyToOne(
    () => Customer,
    (customer) => customer.activities
  )
  customer: Customer;

  @ManyToOne(
    () => User,
    (user) => user.activities
  )
  user: User;

  @ManyToOne(
    () => Lead,
    (lead) => lead.activities,
    {
      nullable: true
    }
  )
  lead: Lead;

  @Column({
    type: 'timestamptz', // timezone support with postgres
    nullable: true
  })
  activity_date: Date;

  @Column({
    type: 'enum',
    enum: ActivityStatus,
    default: ActivityStatus.PLANNED
  })
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
