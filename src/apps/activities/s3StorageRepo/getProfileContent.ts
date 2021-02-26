import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    console.debug('701'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
    console.debug('702'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    const content = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).createReadStream();
    console.debug('703'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    return { content };
  };
};
