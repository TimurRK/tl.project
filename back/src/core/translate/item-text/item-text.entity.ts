import { ID } from '@nestjs/graphql';

import { Column, CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { OneToMany } from 'typeorm';
import { ItemTextVersion } from '../item-text-version/item-text-version.entity';

@ObjectType()
@Entity()
export class ItemText {
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

  @Field(() => String, { nullable: false })
  @Column('text')
  public value: string;

  @OneToMany(() => ItemTextVersion, (item_text_version) => item_text_version.item_text)
  public versions: ItemTextVersion[];
}
