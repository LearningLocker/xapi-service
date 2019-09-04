import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
      const filePath = `${profileDir}/${opts.key}`;
      const file = config.storage.bucket(config.bucketName).file(filePath);
      const writeStream = file.createWriteStream();
      opts.content.pipe(writeStream);
      writeStream.on('finish', resolve);
      opts.content.on('error', reject);
      writeStream.on('error', reject);
    });
  };
};
