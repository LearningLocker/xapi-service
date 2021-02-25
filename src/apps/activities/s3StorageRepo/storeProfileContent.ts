import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    console.debug('301'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await config.client.upload({
      Body: opts.content,
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
    console.debug('302'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
  };
};
