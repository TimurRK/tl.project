import { Field, ID, ObjectType } from '@nestjs/graphql';

import { EBookStatus } from '../book.entity';

@ObjectType()
export class BookChangeStatus {
  @Field(() => ID, { nullable: false })
  public id: number;

  @Field(() => EBookStatus, { nullable: false })
  public book_status: EBookStatus;
}
