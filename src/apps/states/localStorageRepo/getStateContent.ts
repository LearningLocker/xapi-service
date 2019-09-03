import * as fs from 'fs-extra';
import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const dir = getStorageDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;
    const content = fs.createReadStream(filePath);
    return { content };
  };
};
