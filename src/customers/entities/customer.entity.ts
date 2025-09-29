import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export enum Status {
  LEAD = 'lead',
  PROSPECT = 'prospect',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  contactPerson?: string;

  @Column({
    nullable: true
  })
  email?: string;

  @Column({
    nullable: true
  })
  phone?: string;

  @Column({
    nullable: true
  })
  address?: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PROSPECT
  })
  status: string;

  @ManyToOne(
    () => User,
    (user) => user.customers,
    { onDelete: 'SET NULL' }
  )
  owner: User;

  @OneToMany(
    () => Activity,
    (activity) => activity.customer
  )
  activities: Activity[]

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
