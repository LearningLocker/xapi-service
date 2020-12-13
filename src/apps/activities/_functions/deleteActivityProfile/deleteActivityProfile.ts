import NoModel from 'jscommons/dist/errors/NoModel';
import ClientModel from '../../../statements/models/ClientModel';
import checkProfileWriteScopes from '../../service/utils/checkProfileWriteScopes';
import validateActivityId from '../../service/utils/validateActivityId';
import { jsonContentType } from '../../utils/constants';
import { deleteActivityProfileContent } from './deleteActivityProfileContent';
import { deleteActivityProfileFromMongo } from './deleteActivityProfileFromMongo';
import { FileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';
import { MongoRecordStorageConfig } from './utils/getRecordStorageConfig/RecordStorageConfig';

interface DeleteActivityProfileConfig {
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly fileStorageConfig: FileStorageConfig;
}

interface DeleteActivityProfileOptions {
  readonly activityId: string;
  readonly client: ClientModel;
  readonly profileId: string;
  readonly ifMatch?: string;
}

export async function deleteActivityProfile(
  config: DeleteActivityProfileConfig,
  opts: DeleteActivityProfileOptions,
): Promise<void> {
  const client = opts.client;
  checkProfileWriteScopes(client.scopes);
  validateActivityId(opts.activityId);

  try {
    const deleteResult = await deleteActivityProfileFromMongo(config.recordStorageConfig, {
      activityId: opts.activityId,
      lrs_id: opts.client.lrs_id,
      organisation: opts.client.organisation,
      ifMatch: opts.ifMatch,
      profileId: opts.profileId,
    });

    if (deleteResult.contentType === jsonContentType) {
      return;
    }

    await deleteActivityProfileContent(config.fileStorageConfig, {
      key: `${deleteResult.id}.${deleteResult.extension}`,
      lrs_id: client.lrs_id,
    });
  } catch (err) {
    // If no profile was found, we will handle this as a 204 instead
    if (err instanceof NoModel) {
      return;
    }
    throw err;
  }
}
