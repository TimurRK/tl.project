import { Context, GraphQLExecutionContext, Parent, Query, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, Pagination, ResolveField } from 'nestjs-graphql-easy';

import { Book } from '../../translate/book/book.entity';
import { User } from '../../oauth/user/user.entity';

import { Bookmark } from './bookmark.entity';

@Resolver(() => Bookmark)
export class BookmarkResolver {
  @Query(() => [Bookmark])
  protected async bookmarks(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'bookmarks',
      entity: () => Bookmark,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Bookmark) _filter: unknown,
    @Order(() => Bookmark) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => User, { nullable: false })
  protected async user(
    @Parent() bookmark: Bookmark,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(bookmark.user_id);
  }

  @ResolveField(() => Book, { nullable: false })
  protected async book(
    @Parent() bookmark: Bookmark,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'book',
      entity: () => Book,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(bookmark.book_id);
  }
}
