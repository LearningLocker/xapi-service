import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import DeleteStateContentOptions from '../repoFactory/options/DeleteStateContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStateContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;

    const deletionCommand = new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: filePath,
    });
    await config.client.send(deletionCommand);

    return;
  };
};
