import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { Query, ResolveField, ELoaderType, Loader, Filter, Order, Pagination } from 'nestjs-graphql-easy';

import { Item } from './item.entity';
import { ItemableType } from './item.itemable';

@Resolver(() => Item)
export class ItemResolver {
  @Query(() => [Item])
  public async items(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'items',
      entity: () => Item,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Item) _filter: unknown,
    @Order(() => Item) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => ItemableType, { nullable: false })
  public async itemable(
    @Parent() item: Item,
    @Loader({
      loader_type: ELoaderType.POLYMORPHIC,
      field_name: 'itemable',
      entity: () => ItemableType,
      entity_fk_key: 'id',
      entity_fk_type: 'itemable_type',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(item.itemable_id);
  }
}
