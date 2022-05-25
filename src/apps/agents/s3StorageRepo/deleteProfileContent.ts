import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;

    const deletionCommand = new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: filePath,
    });
    await config.client.send(deletionCommand);

    return;
  };
};
