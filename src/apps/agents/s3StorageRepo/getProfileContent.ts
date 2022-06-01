import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;

    const objectConfig = {
      Bucket: config.bucketName,
      Key: filePath,
    };

    const s3HeadObjectCommand = new HeadObjectCommand(objectConfig);
    await config.client.send(s3HeadObjectCommand);

    const getObjectCommand = new GetObjectCommand(objectConfig);
    const { Body } = await config.client.send(getObjectCommand);

    return { content: Body as NodeJS.ReadableStream };
  };
};
