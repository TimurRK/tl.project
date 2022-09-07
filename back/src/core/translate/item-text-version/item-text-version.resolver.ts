import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, ResolveField, Pagination, Order, Filter, Mutation } from 'nestjs-graphql-easy';

import { User } from '../../oauth/user/user.entity';

import { ItemTextVersion } from './item-text-version.entity';
import { ItemTextVersionService } from './item-text-version.service';
import { CreateItemTextVersionDTO } from './mutation-input/create.dto';
import { UpdateItemTextVersionDTO } from './mutation-input/update.dto';

@Resolver(() => ItemTextVersion)
export class ItemTextVersionResolver {
  constructor(private readonly itemtextVersionService: ItemTextVersionService) {}

  @Query(() => [ItemTextVersion])
  public async item_text_versions(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'item_text_versions',
      entity: () => ItemTextVersion,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => ItemTextVersion) _filter: unknown,
    @Order(() => ItemTextVersion) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => User, { nullable: false })
  public async user(
    @Parent() item_text_version: ItemTextVersion,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(item_text_version.user_id);
  }

  @Mutation(() => ItemTextVersion)
  public async textVersionCreate(@Args('data') data: CreateItemTextVersionDTO) {
    /**
     * @TODO check permissions
     */

    return await this.itemtextVersionService.create(data);
  }

  @Mutation(() => ItemTextVersion)
  public async textVersionUpdate(@Args('id', { type: () => ID }) id: string, @Args('data') data: UpdateItemTextVersionDTO) {
    /**
     * @TODO check permissions
     */

    return await this.itemtextVersionService.update(id, data);
  }
}
