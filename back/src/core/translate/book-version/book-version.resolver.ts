import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Loader, ResolveField, Query, Pagination, Filter, Order } from 'nestjs-graphql-easy';

import { User } from '../../oauth/user/user.entity';

import { BookVersion } from './book-version.entity';

@Resolver(() => BookVersion)
export class BookVersionResolver {
  @Query(() => [BookVersion])
  public async book_versions(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'book_versions',
      entity: () => BookVersion,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => BookVersion) _filter: unknown,
    @Order(() => BookVersion) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => User, { nullable: false })
  public async user(
    @Parent() book_version: BookVersion,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(book_version.user_id);
  }
}
