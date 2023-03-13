import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GraphQLError, GraphQLSchema } from 'graphql';
import { setDataSource } from 'nestjs-graphql-easy';

import config from 'config';
import { Request } from 'express';

import { LoggerStore } from '../logger/logger.store';
import { DataSource } from 'typeorm';

const GRAPHQL_SETTINGS = config.get<IGraphqlSettings>('GRAPHQL_SETTINGS');

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly dataSource: DataSource) {
    setDataSource(this.dataSource);
  }

  public createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    return {
      ...GRAPHQL_SETTINGS,
      driver: ApolloDriver,
      autoSchemaFile: __dirname + '/schema.graphql',
      formatError: (err: GraphQLError) => {
        return err;
      },
      context: ({ req }: { req: Request & { logger_store: LoggerStore } }) => ({
        req,
        logger_store: req.logger_store,
      }),
      transformSchema: (schema: GraphQLSchema) => {
        return schema;
      },
    };
  }
}
