import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import config from 'config';
import { Request } from 'express';

import { cors_not_allowed } from './errors';
import { getMethod, getOrigin, getPath } from './helpers/req.helper';

const CORS_SETTINGS = config.get<ICorsSettings>('CORS_SETTINGS');

export const cors_options_delegate: unknown = (req: Request, callback: (err: Error, options: CorsOptions) => void) => {
  const cors_options: CorsOptions = {
    methods: CORS_SETTINGS.allowed_methods,
    credentials: CORS_SETTINGS.allowed_credentials,
    origin: false,
  };

  let error: Error | null = cors_not_allowed({ raise: false }, false);

  const origin = getOrigin(req);
  const url = getPath(req);
  const method = getMethod(req);

  if (
    (!CORS_SETTINGS.allowed_methods.length || CORS_SETTINGS.allowed_methods.indexOf(method) !== -1) &&
    (!origin || !CORS_SETTINGS.allowed_origins.length || CORS_SETTINGS.allowed_origins.indexOf(origin) !== -1) &&
    (!CORS_SETTINGS.allowed_paths.length || CORS_SETTINGS.allowed_paths.indexOf(url) !== -1)
  ) {
    cors_options.origin = true;
    error = null;
  }

  callback(error, cors_options);
};
