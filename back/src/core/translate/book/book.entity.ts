import { ID } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  Field,
  ObjectType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  registerEnumType,
} from 'nestjs-graphql-easy';
import { Index, OneToMany } from 'typeorm';

import { Bookmark } from '../../community/bookmark/bookmark.entity';
import { BookVersion } from '../book-version/book-version.entity';
import { Section } from '../section/section.entity';
import { Translator } from '../translator/translator.entity';

export enum EBookStatus {
  QUEUE = 1,
  IN_PROCESS = 2,
  READY = 3,
  SUSPENDED = 4,
  THROWN = 5,
}

registerEnumType(EBookStatus, {
  name: 'EBookStatus',
});

@ObjectType()
@Entity()
export class Book {
  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @PrimaryGeneratedColumn('increment')
  public id: number;

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
  public annotation?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public cover?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public author?: string;

  @Field(() => Boolean, { nullable: false, filterable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'true',
  })
  public is_private: boolean;

  @Field(() => EBookStatus, { nullable: false, filterable: true })
  @Index()
  @Column({
    type: 'enum',
    enum: EBookStatus,
    nullable: false,
    default: EBookStatus.QUEUE,
  })
  public book_status: EBookStatus;

  @OneToMany(() => Translator, (translator) => translator.book)
  public translators: Translator[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.book)
  public bookmarks?: Bookmark[];

  @OneToMany(() => BookVersion, (book_version) => book_version.book)
  public versions: BookVersion[];

  @OneToMany(() => Section, (section) => section.book)
  public sections: Section[];
}
