import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
    const content = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).createReadStream();
    return { content };
  };
};
