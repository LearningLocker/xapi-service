import {
  Aborter,
  BlobURL,
} from '@azure/storage-blob';
import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;

    const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);

    await blobUrl.delete(Aborter.none);
  };
};
