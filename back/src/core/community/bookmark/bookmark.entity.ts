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
import { Index, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '../../oauth/user/user.entity';
import { Book } from '../../translate/book/book.entity';

export enum EBookmarkStatus {
  PLANNED = 1,
  WATCHING = 2,
  COMPLETED = 3,
  ON_HOLD = 4,
  DROPPED = 5,
}

registerEnumType(EBookmarkStatus, {
  name: 'EBookmarkStatus',
});

@ObjectType()
@Entity()
@Index(['book_id', 'user_id'], { unique: true })
export class Bookmark {
  @Field(() => ID, { nullable: false })
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

  @Field(() => EBookmarkStatus, { nullable: false })
  @Index()
  @Column({
    type: 'enum',
    enum: EBookmarkStatus,
    nullable: false,
    default: EBookmarkStatus.PLANNED,
  })
  public bookmark_status: EBookmarkStatus;

  @Field(() => ID, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column('integer', { nullable: false })
  public book_id: number;

  @ManyToOne(() => Book, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  public book: Book;

  @Field(() => ID, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
