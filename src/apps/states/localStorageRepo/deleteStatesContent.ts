import * as fs from 'fs-extra';
import DeleteStatesContentOptions from '../repoFactory/options/DeleteStatesContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStatesContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    await Promise.all(opts.keys.map((key) => {
      const filePath = `${dir}/${key}`;
      return fs.unlink(filePath);
    }));
  };
};
