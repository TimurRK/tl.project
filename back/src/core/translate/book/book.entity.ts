import { ID } from '@nestjs/graphql';

import { Column, CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { Index, OneToMany } from 'typeorm';

import { BookVersion } from '../book-version/book-version.entity';
import { Section } from '../section/section.entity';
import { Translator } from '../translator/translator.entity';

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

  @Index()
  @Column({
    nullable: false,
    default: () => 'true',
  })
  public is_private: boolean;

  @OneToMany(() => Translator, (translator) => translator.book)
  public translators: Translator[];

  @OneToMany(() => BookVersion, (book_version) => book_version.book)
  public versions: BookVersion[];

  @OneToMany(() => Section, (section) => section.book)
  public sections: Section[];
}
