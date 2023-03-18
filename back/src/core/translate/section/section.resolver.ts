import { Args, Context, GraphQLExecutionContext, ID, Parent, Resolver } from '@nestjs/graphql';

import { ELoaderType, Filter, Loader, Order, ResolveField, Pagination, Query, Mutation } from 'nestjs-graphql-easy';

import { Item } from '../item/item.entity';
import { SectionVersion } from '../section-version/section-version.entity';
import { SectionChangeStatus } from './mutation-result/change-status.dto';

import { ESectionStatus, Section } from './section.entity';
import { SectionService } from './section.service';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Query(() => [Section])
  protected async sections(
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
  protected async section_versions(
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
  protected async items(
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

  @Mutation(() => SectionChangeStatus)
  protected async sectionChangeStatus(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'section_status', type: () => ESectionStatus }) status: ESectionStatus
  ) {
    return await this.sectionService.changeStatus(id, status);
  }
}
