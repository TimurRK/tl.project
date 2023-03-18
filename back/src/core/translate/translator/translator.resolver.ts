import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, Pagination, Query, ResolveField } from 'nestjs-graphql-easy';

import { User } from '../../oauth/user/user.entity';

import { Book } from '../book/book.entity';

import { Translator } from './translator.entity';

@Resolver(() => Translator)
export class TranslatorResolver {
  @Query(() => [Translator])
  protected async translators(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'translators',
      entity: () => Translator,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Translator) _filter: unknown,
    @Order(() => Translator) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => User, { nullable: false })
  protected async user(
    @Parent() translator: Translator,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(translator.user_id);
  }

  @ResolveField(() => Book, { nullable: false })
  protected async book(
    @Parent() translator: Translator,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'book',
      entity: () => Book,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(translator.book_id);
  }
}
