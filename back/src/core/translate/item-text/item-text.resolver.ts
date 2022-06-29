import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, ResolveField, Pagination, Order, Filter } from 'nestjs-graphql-easy';

import { ItemTextVersion } from '../item-text-version/item-text-version.entity';

import { ItemText } from './item-text.entity';

@Resolver(() => ItemText)
export class ItemTextResolver {
  @Query(() => [ItemText])
  public async item_texts(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'item_texts',
      entity: () => ItemText,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => ItemText) _filter: unknown,
    @Order(() => ItemText) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => [ItemTextVersion], { nullable: true })
  public async item_text_versions(
    @Parent() item_text: ItemText,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'item_text_versions',
      entity: () => ItemTextVersion,
      entity_fk_key: 'item_text_id',
    })
    field_alias: string,
    @Filter(() => ItemTextVersion) _filter: unknown,
    @Order(() => ItemTextVersion) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(item_text.id);
  }
}
