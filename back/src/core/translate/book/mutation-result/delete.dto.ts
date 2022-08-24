import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookDelete {
  @Field(() => ID, { nullable: false })
  public id: number;
}
