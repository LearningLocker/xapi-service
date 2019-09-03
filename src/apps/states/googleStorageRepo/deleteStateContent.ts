import DeleteStateContentOptions from '../repoFactory/options/DeleteStateContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStateContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;
    const file = config.storage.bucket(config.bucketName).file(filePath);
    await file.delete();
  };
};
