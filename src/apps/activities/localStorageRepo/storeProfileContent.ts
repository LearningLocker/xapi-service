import * as fs from 'fs-extra';
import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    await fs.ensureDir(profileDir);
    await new Promise<void>((resolve, reject) => {
      const filePath = `${profileDir}/${opts.key}`;
      const writeStream = fs.createWriteStream(filePath);
      opts.content.pipe(writeStream);
      writeStream.on('finish', () => {
        resolve();
      });
      opts.content.on('error', reject);
      writeStream.on('error', reject);
    });
  };
};
