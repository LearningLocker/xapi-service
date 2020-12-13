import NoModel from 'jscommons/dist/errors/NoModel';
import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import { MongoRecordStorageConfig } from '../getRecordStorageConfig/RecordStorageConfig';
import { TrackingConfig } from '../getTrackingConfig/TrackingConfig';
import { getClientFromMongo } from './getClientFromMongo';
import { track } from './trackClientUsage';

interface GetClientConfig {
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly trackingConfig: TrackingConfig;
}

export async function getClient(config: GetClientConfig, authToken = '') {
  try {
    const client = await getClientFromMongo(config.recordStorageConfig, authToken);
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
