import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'nestjs-graphql-easy';
import { BeforeInsert, Index, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    nullable: false,
    type: 'timestamp without time zone',
  })
  public expires_at: Date;

  @Index()
  @Column('uuid', { nullable: false })
  public user_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @BeforeInsert()
  protected generateTokenExpiresAt() {
    this.expires_at = new Date(new Date().setDate(new Date().getDate() + 7));
  }
}
