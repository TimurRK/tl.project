import { Context, GraphQLExecutionContext, Parent, Resolver } from '@nestjs/graphql';

import { Query, ELoaderType, Loader, ResolveField, Pagination, Order, Filter } from 'nestjs-graphql-easy';

import { User } from '../../oauth/user/user.entity';

import { SectionVersion } from './section-version.entity';

@Resolver(() => SectionVersion)
export class SectionVersionResolver {
  @Query(() => [SectionVersion])
  public async section_versions(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'section_versions',
      entity: () => SectionVersion,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => SectionVersion) _filter: unknown,
    @Order(() => SectionVersion) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias];
  }

  @ResolveField(() => User, { nullable: false })
  public async user(
    @Parent() section_version: SectionVersion,
    @Loader({
      loader_type: ELoaderType.MANY_TO_ONE,
      field_name: 'user',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return await ctx[field_alias].load(section_version.user_id);
  }
}
