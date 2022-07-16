import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GraphQLError, GraphQLSchema } from 'graphql';

import config from 'config';
import { Request } from 'express';

import { cors_options_delegate } from '../cors.options';
import { LoggerStore } from '../logger/logger.store';
import { DataSource } from 'typeorm';

const appSettings = config.get<IAppSettings>('APP_SETTINGS');
const graphqlSettings = config.get<IGraphqlSettings>('GRAPHQL_SETTINGS');

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly dataSource: DataSource) {}

  public createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    return {
      ...graphqlSettings,
      driver: ApolloDriver,
      autoSchemaFile: __dirname + '/schema.graphql',
      formatError: (err: GraphQLError) => {
        return err;
      },
      context: ({ req }: { req: Request & { logger_store: LoggerStore } }) => ({
        req,
        logger_store: req.logger_store,
        data_source: this.dataSource,
      }),
      cors: cors_options_delegate,
      bodyParserConfig: {
        limit: appSettings.body_limit,
      },
      transformSchema: (schema: GraphQLSchema) => {
        return schema;
      },
    };
  }
}
