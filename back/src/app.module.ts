import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from './graphql/graphql.module';
import { HealthzModule } from './healthz/healthz.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CoreModule } from './core/core.module';
import { OAuthMiddleware } from './core/oauth/oauth.middleware';

@Module({
  imports: [LoggerModule, HealthzModule, DatabaseModule, GraphQLModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    consumer
      .apply(OAuthMiddleware)
      .forRoutes({ path: 'uploads', method: RequestMethod.POST }, { path: 'uploads', method: RequestMethod.OPTIONS });
  }
}
