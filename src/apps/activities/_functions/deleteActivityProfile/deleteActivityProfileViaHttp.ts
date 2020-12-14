import { BAD_REQUEST, NO_CONTENT, UNAUTHORIZED } from 'http-status-codes';
import NoModel from 'jscommons/dist/errors/NoModel';
import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import { Warnings } from 'rulr';
import stringToStream from 'string-to-stream';
import getActivityId from '../../expressPresenter/utils/getActivityId';
import getEtag from '../../expressPresenter/utils/getEtag';
import getProfileId from '../../expressPresenter/utils/getProfileId';
import validateVersionHeader from '../../expressPresenter/utils/validateVersionHeader';
import { jsonContentType, xapiHeaderVersion } from '../../utils/constants';
import { deleteActivityProfile } from './deleteActivityProfile';
import { AuthConfig } from './utils/getAuthConfig/AuthConfig';
import { getClient } from './utils/getClient/getClient';
import { FileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';
import { MongoRecordStorageConfig } from './utils/getRecordStorageConfig/RecordStorageConfig';
import { TrackingConfig } from './utils/getTrackingConfig/TrackingConfig';
import { HttpRequest, HttpResponse } from './utils/HttpInterfaces';
import { translateWarning } from './utils/translateWarning';

export interface DeleteActivityProfileViaHttpConfig {
  readonly authConfig: AuthConfig;
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly fileStorageConfig: FileStorageConfig;
  readonly trackingConfig: TrackingConfig;
}

export async function deleteActivityProfileViaHttp(
  config: DeleteActivityProfileViaHttpConfig,
  req: HttpRequest,
): Promise<HttpResponse> {
  try {
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
  } catch (err) {
    if (err instanceof Unauthorised) {
      return {
        statusCode: UNAUTHORIZED,
        headers: {
          'X-Experience-API-Version': xapiHeaderVersion,
          'Content-Type': jsonContentType,
        },
        body: stringToStream(JSON.stringify({
          message: 'Unauthorized',
          requestId: req.requestId,
        })),
      };
    }
    if (err instanceof NoModel) {
      return {
        statusCode: UNAUTHORIZED,
        headers: {
          'X-Experience-API-Version': xapiHeaderVersion,
          'Content-Type': jsonContentType,
        },
        body: stringToStream(JSON.stringify({
          message: `No ${err.modelName} found`,
          requestId: req.requestId,
        })),
      };
    }
    if (err instanceof Warnings) {
      return {
        statusCode: BAD_REQUEST,
        headers: {
          'X-Experience-API-Version': xapiHeaderVersion,
          'Content-Type': jsonContentType,
        },
        body: stringToStream(JSON.stringify({
          warnings: err.warnings.map(translateWarning),
          requestId: req.requestId,
        })),
      };
    }
    throw err;
  }
}
