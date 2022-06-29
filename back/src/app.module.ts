import { MiddlewareConsumer, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import GraphQLModule from './graphql/graphql.module';
import { HealthzModule } from './healthz/healthz.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CoreModule } from './core/core.module';
import { OAuthMiddleware } from './middlewares/oauth.middleware';

@Module({
  imports: [LoggerModule, HealthzModule, DatabaseModule, GraphQLModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    consumer.apply(OAuthMiddleware).forRoutes('upload');
  }
}
