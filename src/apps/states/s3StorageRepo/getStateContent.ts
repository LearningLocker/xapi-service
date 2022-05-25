import { Readable as ReadableStream } from 'stream';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;

    const getObjectCommand = new GetObjectCommand({
      Bucket: config.bucketName,
      Key: filePath,
    });
    const { Body } = await config.client.send(getObjectCommand);
    return { content: Body as ReadableStream };
  };
};
