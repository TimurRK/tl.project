import { ID } from '@nestjs/graphql';

import { Column, CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '../../oauth/user/user.entity';
import { Section } from '../section/section.entity';

@ObjectType()
@Entity()
export class SectionVersion {
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

  @Field(() => String, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column()
  public title: string;

  @Field(() => String, { nullable: true })
  @Column()
  public epigraph?: string;

  @Field(() => Boolean, { nullable: false, filterable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public is_main: boolean;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public section_id: string;

  @ManyToOne(() => Section, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  public section: Section;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
