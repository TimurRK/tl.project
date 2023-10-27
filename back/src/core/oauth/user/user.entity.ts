import { ID } from '@nestjs/graphql';

import { BeforeInsert, BeforeUpdate, Index, OneToMany } from 'typeorm';
import {
  Field,
  ObjectType,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  registerEnumType,
} from 'nestjs-graphql-easy';

import { RefreshToken } from '../refresh-token/refresh-token.entity';
import { RecoveryKey } from '../recovery-key/recovery-key.entity';
import { Translator } from '../../translate/translator/translator.entity';
import { BookVersion } from '../../translate/book-version/book-version.entity';
import { SectionVersion } from '../../translate/section-version/section-version.entity';
import { ItemTextVersion } from '../../translate/item-text-version/item-text-version.entity';
import { Bookmark } from '../../community/bookmark/bookmark.entity';

export interface IJwtPayload {
  id: string;
  login: string;
  is_admin: boolean;
  is_blocked: boolean;
}

export enum EUserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(EUserGender, {
  name: 'EUserGender',
});

export enum EUserLocale {
  RU = 'RU',
  EN = 'EN',
}

registerEnumType(EUserLocale, {
  name: 'EUserLocale',
});

@ObjectType()
@Entity()
export class User {
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

  @Field(() => String, { nullable: false, sortable: true, filterable: true })
  @Index({ unique: true })
  @Column({ nullable: false })
  public login: string;

  @Column({ nullable: false })
  public password: string;

  @Field(() => String, { nullable: true, sortable: true, filterable: true })
  @Index()
  @Column({ nullable: true })
  public nickname?: string;

  @Field(() => EUserGender, { nullable: true, filterable: true })
  @Index()
  @Column({
    type: 'enum',
    enum: EUserGender,
    nullable: true,
  })
  public gender?: EUserGender;

  @Field(() => EUserLocale, { nullable: true, filterable: true })
  @Index()
  @Column({
    type: 'enum',
    enum: EUserLocale,
    nullable: true,
  })
  public locale?: EUserLocale;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public avatar?: string;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  public birthdate?: Date;

  @Field(() => Boolean, { nullable: false })
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public show_birthdate: boolean;

  /**
   * TODO is_admin only
   */
  @Field(() => Boolean, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public is_blocked: boolean;

  /**
   * TODO is_admin only
   */
  @Field(() => Boolean, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public is_admin: boolean;

  @Field(() => Boolean, { nullable: false, filterable: true, sortable: true })
  @Index()
  @Column({
    nullable: false,
    default: () => 'false',
  })
  public is_online: boolean;

  @OneToMany(() => RefreshToken, (refresh_token) => refresh_token.user)
  public refresh_tokens?: RefreshToken[];

  @OneToMany(() => RecoveryKey, (recovery_key) => recovery_key.user)
  public recovery_keys?: RecoveryKey[];

  @OneToMany(() => Translator, (translator) => translator.user)
  public translators?: Translator[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  public bookmarks?: Bookmark[];

  @OneToMany(() => BookVersion, (book_version) => book_version.user)
  public book_versions?: BookVersion[];

  @OneToMany(() => SectionVersion, (section_version) => section_version.user)
  public section_versions?: SectionVersion[];

  @OneToMany(() => ItemTextVersion, (item_text_version) => item_text_version.user)
  public item_text_versions?: ItemTextVersion[];

  @BeforeInsert()
  @BeforeUpdate()
  protected loginToLowerCase() {
    this.login = this.login.trim().toLowerCase();
  }

  public json_for_jwt(): IJwtPayload {
    return {
      id: this.id,
      login: this.login,
      is_admin: this.is_admin,
      is_blocked: this.is_blocked,
    };
  }
}
