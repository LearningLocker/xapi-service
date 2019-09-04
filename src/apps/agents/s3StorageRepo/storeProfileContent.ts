import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.upload({
      Body: opts.content,
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
  };
};
