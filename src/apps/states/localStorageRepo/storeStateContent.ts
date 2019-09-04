import * as fs from 'fs-extra';
import StoreStateContentOptions from '../repoFactory/options/StoreStateContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreStateContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    await fs.ensureDir(dir);
    await new Promise<void>((resolve, reject) => {
      const filePath = `${dir}/${opts.key}`;
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
