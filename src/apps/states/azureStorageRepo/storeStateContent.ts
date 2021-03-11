import { Readable } from 'stream';
import { Aborter, BlobURL, BlockBlobURL, uploadStreamToBlockBlob } from '@azure/storage-blob';
import StoreStateContentOptions from '../repoFactory/options/StoreStateContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

const BYTES_IN_KILOBYTES = 1024;
const KILOBYTES_IN_MEGABYTES = 1024;
const FOUR = 4;

// https://github.com/Azure/azure-storage-js/blob/master/blob/samples/highlevel.sample.js
const BUFFER_SIZE = FOUR * KILOBYTES_IN_MEGABYTES * BYTES_IN_KILOBYTES; // 4MB
const MAX_BUFFERS = 20;

export default (config: Config) => {
  return async (opts: StoreStateContentOptions): Promise<void> => {
    const profileDir = getStorageDir({
      subfolder: config.subFolder,
      lrs_id: opts.lrs_id,
    });
    const filePath = `${profileDir}/${opts.key}`;

    const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
    const blockBlobUrl = BlockBlobURL.fromBlobURL(blobUrl);

    const contentStreamPromise = new Promise<void>((resolve, reject) => {
      opts.content.on('error', reject);
      opts.content.on('end', resolve);
      opts.content.on('close', resolve);
      opts.content.on('finish', resolve);
    });

    await uploadStreamToBlockBlob(
      Aborter.none,
      opts.content as Readable,
      blockBlobUrl,
      BUFFER_SIZE,
      MAX_BUFFERS,
    );

    await contentStreamPromise;
  };
};
