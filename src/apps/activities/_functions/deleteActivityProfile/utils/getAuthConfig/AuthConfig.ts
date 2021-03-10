export enum AuthProvider {
  Test = 'test',
  Mongo = 'mongo',
}

export interface MongoAuthConfig {
  readonly authProvider: AuthProvider.Mongo;
  readonly mongoUri: string;
  readonly mongoDbName: string;
}

export interface TestAuthConfig {
  readonly authProvider: AuthProvider.Test;
}

export type AuthConfig = (
  MongoAuthConfig | TestAuthConfig
);
