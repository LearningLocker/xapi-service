import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    const file = config.storage.bucket(config.bucketName).file(filePath);
    const writeStream = file.createWriteStream();

    const contentStreamPromise = new Promise<void>((resolve, reject) => {
      opts.content.on('error', reject);
      opts.content.on('end', resolve);
      opts.content.on('close', resolve);
      opts.content.on('finish', resolve);
    });

    const writeStreamPromise = new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    opts.content.pipe(writeStream);

    await Promise.all([contentStreamPromise, writeStreamPromise]);
  };
};
