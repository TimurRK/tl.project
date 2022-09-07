import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateItemTextVersionDTO {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  public value: string;

  @Field(() => Boolean, { nullable: false })
  @IsBoolean()
  public is_main: boolean;
}
