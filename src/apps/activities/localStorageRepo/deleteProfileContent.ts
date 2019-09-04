import * as fs from 'fs-extra';
import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    await fs.unlink(filePath);
  };
};
