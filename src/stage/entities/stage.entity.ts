import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'int',
    default: 1
  })
  seq: number;
}
