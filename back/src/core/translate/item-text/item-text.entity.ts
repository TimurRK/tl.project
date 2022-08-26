import { ID } from '@nestjs/graphql';

import { Column, CreateDateColumn, Entity, Field, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ItemTextVersion } from '../item-text-version/item-text-version.entity';
import { Item } from '../item/item.entity';

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

  /**
   * For cascade delete to work
   */

  @Index()
  @Column('uuid', { nullable: true })
  public item_id: string;

  @ManyToOne(() => Item, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  public item: Item;
}
