import config from '../../../../../../config';
import { AuthConfig, AuthProvider } from './AuthConfig';

export function getAuthConfig(): AuthConfig {
  switch (config.repoFactory.authRepoName) {
    case AuthProvider.Test: return {
      authProvider: AuthProvider.Test,
    };
    default: case AuthProvider.Mongo: return {
      authProvider: AuthProvider.Mongo,
      mongoDbName: config.mongoModelsRepo.dbName,
      mongoUri: config.mongoModelsRepo.url,
    };
  }
}
