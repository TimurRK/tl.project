import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ESectionStatus } from '../section.entity';

@ObjectType()
export class SectionChangeStatus {
  @Field(() => ID, { nullable: false })
  public id: number;

  @Field(() => ESectionStatus, { nullable: false })
  public section_status: ESectionStatus;
}
