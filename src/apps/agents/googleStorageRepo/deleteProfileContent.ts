import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    const file = config.storage.bucket(config.bucketName).file(filePath);
    await file.delete();
  };
};
