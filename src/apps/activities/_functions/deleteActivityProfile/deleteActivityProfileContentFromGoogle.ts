import Storage from '@google-cloud/storage';
import getStorageDir from '../../utils/getStorageDir';
import { DeleteActivityProfileContentOptions } from './deleteActivityProfileContent';
import { GoogleFileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';

export async function deleteActivityProfileContentFromGoogle(
  config: GoogleFileStorageConfig,
  opts: DeleteActivityProfileContentOptions,
): Promise<void> {
  const storage = Storage({
    keyFilename: config.googleKeyFileName,
    projectId: config.googleProjectId,
  });
  const profileDir = getStorageDir({
    subfolder: config.googleSubFolder,
    lrs_id: opts.lrs_id,
  });
  const filePath = `${profileDir}/${opts.key}`;
  const file = storage.bucket(config.googleBucketName).file(filePath);
  await file.delete();
}
