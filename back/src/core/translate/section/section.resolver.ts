import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, ResolveField, Pagination, Query } from 'nestjs-graphql-easy';

import { Item } from '../item/item.entity';
import { SectionVersion } from '../section-version/section-version.entity';

import { Section } from './section.entity';

@Resolver(() => Section)
export class SectionResolver {
  @Query(() => [Section])
  public async sections(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'sections',
      entity: () => Section,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => Section) _filter: unknown,
    @Order(() => Section) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => [SectionVersion], { nullable: true })
  public async section_versions(
    @Parent() section: Section,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'section_versions',
      entity: () => SectionVersion,
      entity_fk_key: 'section_id',
    })
    field_alias: string,
    @Filter(() => SectionVersion) _filter: unknown,
    @Order(() => SectionVersion) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(section.id);
  }

  @ResolveField(() => [Item], { nullable: true })
  public async items(
    @Parent() section: Section,
    @Loader({
      loader_type: ELoaderType.ONE_TO_MANY,
      field_name: 'items',
      entity: () => Item,
      entity_fk_key: 'section_id',
    })
    field_alias: string,
    @Filter(() => Item) _filter: unknown,
    @Order(() => Item) _order: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(section.id);
  }
}
