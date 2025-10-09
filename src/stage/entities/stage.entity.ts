import { Pipeline } from 'src/pipelines/entities/pipeline.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @ManyToOne(
    () => Pipeline,
    (pipeline) => pipeline.stages,
    { nullable: true }
  )
  pipeline: Pipeline | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
