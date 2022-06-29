interface ICorsSettings {
  readonly allowedOrigins: string[];
  readonly allowedUrls: string[];
  readonly allowedMethods: string[];
  readonly allowedCredentials: boolean;
  readonly allowedHeaders: string[];
}

interface IAppSettings {
  readonly port: number;
  readonly wssPort: number;
  readonly wssPingInterval: number;
  readonly wssPingTimeout: number;
  readonly bodyLimit: string;
  readonly bodyParameterLimit: number;
}

interface IGraphqlSettings {
  readonly playground: boolean;
  readonly debug: boolean;
  readonly introspection: boolean;
  readonly installSubscriptionHandlers: boolean;
}

interface ILogSettings {
  readonly level: string;
  readonly silence: string[];
}

interface IJwtSettings {
  readonly secretKey: string;
  readonly algorithm: string;
  readonly tokenExpiresIn: number;
}

interface IFile {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding?: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
}
