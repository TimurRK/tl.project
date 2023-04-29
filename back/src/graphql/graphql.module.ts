import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { YogaDriverConfig, YogaDriver } from '@graphql-yoga/nestjs';

import { GraphQLOptions } from './graphql.options';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestJSGraphQLModule.forRootAsync<YogaDriverConfig>({
      imports: [],
      useClass: GraphQLOptions,
      inject: [],
      driver: YogaDriver,
    }),
  ],
  providers: [],
  exports: [],
})
export class GraphQLModule {}
