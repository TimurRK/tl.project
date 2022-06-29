import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, Pagination, Query, ResolveField } from 'nestjs-graphql-easy';

import { BookVersion } from '../book-version/book-version.entity';
import { Section } from '../section/section.entity';

import { Book } from './book.entity';

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book])
  public async books(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'books',
      entity: () => Book,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Book) _filter: unknown,
    @Order(() => Book) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => [BookVersion], { nullable: true })
  public async book_versions(
    @Parent() book: Book,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'book_versions',
      entity: () => BookVersion,
      entity_fk_key: 'book_id',
    })
    field_alias: string,
    @Filter(() => BookVersion) _filter: unknown,
    @Order(() => BookVersion) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(book.id);
  }

  @ResolveField(() => [Section], { nullable: true })
  public async sections(
    @Parent() book: Book,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'sections',
      entity: () => Section,
      entity_fk_key: 'book_id',
    })
    field_alias: string,
    @Filter(() => Section) _filter: unknown,
    @Order(() => Section) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(book.id);
  }
}
