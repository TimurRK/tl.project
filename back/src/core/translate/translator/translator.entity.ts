import { ID } from '@nestjs/graphql';

import { Column, Entity, Field, ObjectType, PrimaryGeneratedColumn } from 'nestjs-graphql-easy';
import { CreateDateColumn, Index, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

import { User } from '../../oauth/user/user.entity';
import { Book } from '../book/book.entity';

@ObjectType()
@Entity()
export class Translator {
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

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('integer', { nullable: false })
  public book_id: number;

  @ManyToOne(() => Book, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  public book: Book;
}
