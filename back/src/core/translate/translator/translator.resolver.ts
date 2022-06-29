import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Loader, Mutation, ResolveField } from 'nestjs-graphql-easy';

import { User } from '../../oauth/user/user.entity';

import { Book } from '../book/book.entity';

import { Translator } from './translator.entity';

@Resolver(() => Translator)
export class TranslatorResolver {
  @Mutation(() => Translator)
  public async createTranslator() {
    return new Translator();
  }

  @ResolveField(() => User, { nullable: false })
  public async user(
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
  public async book(
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
