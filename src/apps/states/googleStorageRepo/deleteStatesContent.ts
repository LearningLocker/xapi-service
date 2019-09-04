import DeleteStatesContentOptions from '../repoFactory/options/DeleteStatesContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStatesContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });

    if (opts.keys.length === 0) {
      return;
    }

    const promises = opts.keys.map(async (key) => {
      const filePath = `${dir}/${key}`;
      const file = config.storage.bucket(config.bucketName).file(filePath);
      await file.delete();
    });

    await Promise.all(promises);
  };
};
