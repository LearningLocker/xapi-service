import NoModel from 'jscommons/dist/errors/NoModel';
import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import { AuthConfig } from '../getAuthConfig/AuthConfig';
import { TrackingConfig } from '../getTrackingConfig/TrackingConfig';
import { getClientRecord } from './getClientRecord';
import { track } from './trackClientUsage';

interface GetClientConfig {
  readonly authConfig: AuthConfig;
  readonly trackingConfig: TrackingConfig;
}

export async function getClient(config: GetClientConfig, authToken = '') {
  try {
    const client = await getClientRecord(config.authConfig, authToken);
    await track(config.trackingConfig, {
      organisationId: client.organisation,
      lrsId: client.lrs_id,
      clientId: client._id,
    });
    return client;
  } catch (err) {
    if (err instanceof NoModel) {
      throw new Unauthorised();
    }
    /* istanbul ignore next */
    throw err;
  }
}
