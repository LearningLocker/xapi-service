import {
  Aborter,
  BlobURL,
} from '@azure/storage-blob';
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
      const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
      await blobUrl.delete(Aborter.none);
    });

    await Promise.all(promises);
  };
};
