import { ID } from '@nestjs/graphql';

import { CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '../../oauth/user/user.entity';
import { Book } from '../book/book.entity';

@ObjectType()
@Entity()
export class BookVersion {
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
  public annotation?: string;

  @Field(() => Boolean, { nullable: false, filterable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public is_main: boolean;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('integer', { nullable: false })
  public book_id: number;

  @ManyToOne(() => Book, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  public book: Book;

  @Field(() => ID, { nullable: false, sortable: true, filterable: true })
  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
