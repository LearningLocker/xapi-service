import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  uploadStreamToBlockBlob,
} from '@azure/storage-blob';
import { Readable } from 'stream';
import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

const BYTES_IN_KILOBYTES = 1024;
const KILOBYTES_IN_MEGABYTES = 1024;
const FOUR = 4;

// https://github.com/Azure/azure-storage-js/blob/master/blob/samples/highlevel.sample.js
const BUFFER_SIZE = FOUR * KILOBYTES_IN_MEGABYTES * BYTES_IN_KILOBYTES; // 4MB
const MAX_BUFFERS = 20;

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const profileDir = getStorageDir({
        subfolder: config.subFolder,
        lrs_id: opts.lrs_id,
      });
      const filePath = `${profileDir}/${opts.key}`;

      const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
      const blockBlobUrl = BlockBlobURL.fromBlobURL(blobUrl);

      opts.content.on('error', reject);

      try {
        await uploadStreamToBlockBlob(
          Aborter.none,
          opts.content as Readable,
          blockBlobUrl,
          BUFFER_SIZE,
          MAX_BUFFERS,
        );
      } catch (err) {
        reject(err);
      }
      resolve();
    });
  };
};
