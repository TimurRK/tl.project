import { Context, GraphQLExecutionContext, Parent, Query, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, Pagination, ResolveField } from 'nestjs-graphql-easy';

import { Translator } from '../../translate/translator/translator.entity';

import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  public async users(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'users',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => User) _filter: unknown,
    @Order(() => User) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => [Translator], { nullable: true })
  public async translators(
    @Parent() user: User,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'translators',
      entity: () => Translator,
      entity_fk_key: 'user_id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(user.id);
  }
}
