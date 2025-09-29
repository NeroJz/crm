import { Activity } from 'src/activities/entities/activity.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  NONE = 'none',
  ADMIN = 'admin',
  SALES = 'sales'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: true
  })
  sid: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NONE
  })
  role: string;

  @OneToMany(
    () => Customer,
    (customer) => customer.owner
  )
  customers: Customer[];

  @OneToMany(
    () => Activity,
    (activity) => activity.user
  )
  activities: Activity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
