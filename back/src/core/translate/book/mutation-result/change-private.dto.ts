import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookChangePrivate {
  @Field(() => ID, { nullable: false })
  public id: number;

  @Field(() => Boolean, { nullable: false })
  public is_private: boolean;
}
