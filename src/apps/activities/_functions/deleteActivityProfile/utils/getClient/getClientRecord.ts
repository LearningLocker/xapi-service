import ClientModel from '../../../../models/ClientModel';
import { AuthConfig, AuthProvider } from '../getAuthConfig/AuthConfig';
import { getClientRecordFromMongo } from './getClientRecordFromMongo';
import { getClientRecordFromTesters } from './getClientRecordFromTesters';

export async function getClientRecord(config: AuthConfig, authToken: string): Promise<ClientModel> {
  switch (config.authProvider) {
    case AuthProvider.Test:
      return getClientRecordFromTesters(authToken);
    default:
    case AuthProvider.Mongo: {
      return getClientRecordFromMongo(config, authToken);
    }
  }
}
