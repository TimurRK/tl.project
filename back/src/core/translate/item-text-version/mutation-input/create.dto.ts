import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateItemTextVersionDTO {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public value: string;

  @Field(() => Boolean, { nullable: false })
  @IsBoolean()
  public is_main: boolean;

  @Field(() => ID, { nullable: false })
  @IsUUID()
  public item_text_id: string;

  @Field(() => ID, { nullable: false })
  @IsUUID()
  public user_id: string;
}
