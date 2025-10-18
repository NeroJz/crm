import { Lead } from 'src/lead/entities/lead.entity';
import { Stage } from 'src/stage/entities/stage.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Pipeline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => Stage,
    (stage) => stage.pipeline
  )
  stages: Stage[];

  @OneToMany(
    () => Lead,
    (lead) => lead.pipeline
  )
  leads: Lead[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
