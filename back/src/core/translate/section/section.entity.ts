import { ID, Int, registerEnumType } from '@nestjs/graphql';

import { Column, CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';

import { Book } from '../book/book.entity';
import { Item } from '../item/item.entity';
import { SectionVersion } from '../section-version/section-version.entity';

export enum ESectionStatus {
  QUEUE = 1,
  IN_PROCESS = 2,
  READY = 3,
}

registerEnumType(ESectionStatus, {
  name: 'ESectionStatus',
});

@Unique('idx_section_position_on_book', ['position', 'book_id'])
@ObjectType()
@Entity()
export class Section {
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
  @Column('text', { nullable: true })
  public epigraph?: string;

  @Field(() => Int, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('integer', { nullable: false })
  public position: number;

  @Field(() => ESectionStatus, { nullable: false })
  @Index()
  @Column({
    type: 'enum',
    enum: ESectionStatus,
    nullable: false,
    default: ESectionStatus.QUEUE,
  })
  public section_status: ESectionStatus;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('integer', { nullable: false })
  public book_id: number;

  @ManyToOne(() => Book, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  public book: Book;

  @OneToMany(() => SectionVersion, (version) => version.section)
  public versions: SectionVersion[];

  @OneToMany(() => Item, (item) => item.section)
  public items: Item[];
}
