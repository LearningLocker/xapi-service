import { Readable } from 'stream';
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;

    const objectConfig = {
      Bucket: config.bucketName,
      Key: filePath,
    };

    const s3HeadObjectCommand = new HeadObjectCommand(objectConfig);
    await config.client.send(s3HeadObjectCommand);

    const getObjectCommand = new GetObjectCommand(objectConfig);
    const { Body } = await config.client.send(getObjectCommand);

    if (Body === undefined) {
      throw new Error('Object body not found');
    }

    return { content: Body as Readable };
  };
};
