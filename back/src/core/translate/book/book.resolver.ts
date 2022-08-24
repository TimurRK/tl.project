import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Mutation, Order, Pagination, Query, ResolveField } from 'nestjs-graphql-easy';

import { BookVersion } from '../book-version/book-version.entity';
import { Section } from '../section/section.entity';

import { Book, EBookStatus } from './book.entity';
import { BookService } from './book.service';
import { BookChangePrivate } from './mutation-result/change-private.dto';
import { BookChangeStatus } from './mutation-result/change-status.dto';
import { BookDelete } from './mutation-result/delete.dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

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

  @Mutation(() => BookDelete)
  public async bookDelete(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Mutation(() => BookChangeStatus)
  public async bookChangeStatus(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'book_status', type: () => EBookStatus }) status: EBookStatus
  ) {
    return await this.bookService.changeStatus(id, status);
  }

  @Mutation(() => BookChangePrivate)
  public async bookChangePrivate(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'is_private', type: () => Boolean }) is_private: boolean
  ) {
    return await this.bookService.changePrivate(id, is_private);
  }
}
