import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';

import { IDBSettings } from './database.types';

const DB_SETTINGS: IDBSettings = config.get('DB_SETTINGS');

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || DB_SETTINGS.host,
    port: (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null) || DB_SETTINGS.port || 5432,
    username: process.env.DB_USERNAME || DB_SETTINGS.username,
    password: process.env.DB_PASSWORD || DB_SETTINGS.password,
    database: `${process.env.NODE_ENV}_${DB_SETTINGS.database}`,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: DB_SETTINGS.synchronize || false,
    logging: DB_SETTINGS.logging,
  };
}
