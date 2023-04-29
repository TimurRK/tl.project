interface ICorsSettings {
  readonly allowed_origins: string[];
  readonly allowed_paths: string[];
  readonly allowed_methods: string[];
  readonly allowed_credentials: boolean;
  readonly allowed_headers: string[];
}

interface IAppSettings {
  readonly port: number;
  readonly wss_port: number;
  readonly wss_ping_interval: number;
  readonly wss_ping_timeout: number;
  readonly body_limit: string;
  readonly body_parameter_limit: number;
}

interface IGraphqlSettings {
  readonly graphiql: boolean;
}

interface ILogSettings {
  readonly level: string;
  readonly silence: string[];
}

interface IJwtSettings {
  readonly secret_key: string;
  readonly algorithm: string;
  readonly access_token_expires_in: number;
  readonly refresh_token_expires_in: number;
}

interface IFile {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding?: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
}
