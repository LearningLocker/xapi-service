import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = `${profileDir}/${opts.key}`;
    console.debug('201'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await config.client.deleteObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
    console.debug('202'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
  };
};
