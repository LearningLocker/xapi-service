import { Aborter, BlobURL } from '@azure/storage-blob';
import GetProfileContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetStateContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

 export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;

     const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
    const content = (await blobUrl.download(Aborter.none, 0)).readableStreamBody;
    if (content === undefined) {
      throw new Error('Blob not found');
    }

     return { content };
  };
};
