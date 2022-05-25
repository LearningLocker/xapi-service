import { Readable as ReadableStream } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';
import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;

    const target = {
      Body: opts.content as ReadableStream,
      Bucket: config.bucketName,
      Key: filePath,
    };
    const upload = new Upload({
      client: config.client,
      params: target,
    });
    await upload.done();
  };
};
