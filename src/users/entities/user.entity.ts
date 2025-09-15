import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
