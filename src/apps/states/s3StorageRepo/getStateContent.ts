import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${dir}/${opts.key}`;
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
