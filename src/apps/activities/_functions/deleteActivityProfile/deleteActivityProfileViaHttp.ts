import { NO_CONTENT } from 'http-status-codes';
import getActivityId from '../../expressPresenter/utils/getActivityId';
import getEtag from '../../expressPresenter/utils/getEtag';
import getProfileId from '../../expressPresenter/utils/getProfileId';
import validateVersionHeader from '../../expressPresenter/utils/validateVersionHeader';
import { xapiHeaderVersion } from '../../utils/constants';
import { deleteActivityProfile } from './deleteActivityProfile';
import { FileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';
import { getClient } from './utils/getClient/getClient';
import { TrackingConfig } from './utils/getTrackingConfig/TrackingConfig';
import { HttpRequest, HttpResponse } from './utils/HttpInterfaces';
import { MongoRecordStorageConfig } from './utils/getRecordStorageConfig/RecordStorageConfig';

export interface DeleteActivityProfileViaHttpConfig {
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly fileStorageConfig: FileStorageConfig;
  readonly trackingConfig: TrackingConfig;
}

export async function deleteActivityProfileViaHttp(
  config: DeleteActivityProfileViaHttpConfig,
  req: HttpRequest,
): Promise<HttpResponse> {
  const client = await getClient(config, req.headers.authorization);
  validateVersionHeader(req.headers['x-experience-api-version']);

  const ifMatch = getEtag(req.headers['if-match']);
  const activityId = getActivityId(req.query.activityId);
  const profileId = getProfileId(req.query.profileId);

  await deleteActivityProfile(config, { activityId, client, profileId, ifMatch });
  return {
    statusCode: NO_CONTENT,
    headers: {
      'X-Experience-API-Version': xapiHeaderVersion,
    },
  };
}
