import { ID, Int } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  Field,
  ObjectType,
  PolymorphicColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne } from 'typeorm';

import { Section } from '../section/section.entity';

@ObjectType()
@Entity()
export class Item {
  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => Date, { nullable: false, sortable: true })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Field(() => Date, { nullable: false, sortable: true })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @Field(() => Int, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('integer', { nullable: false })
  public position: number;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public section_id: string;

  @ManyToOne(() => Section, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  public section: Section;

  @Field(() => ID, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column('uuid', { nullable: false })
  @PolymorphicColumn()
  public itemable_id: string;

  @Field(() => String, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column({ nullable: false })
  @PolymorphicColumn()
  public itemable_type: string;
}
