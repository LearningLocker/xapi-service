import * as S3 from 'aws-sdk/clients/s3';
import DeleteStatesContentOptions from '../repoFactory/options/DeleteStatesContentOptions';
import getStorageDir from '../utils/getStorageDir';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStatesContentOptions): Promise<void> => {
    const dir = getStorageDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });

    if (opts.keys.length === 0) {
      return;
    }
    const identifierList: S3.ObjectIdentifierList = opts.keys.map((key) => {
      return { Key: `${dir}/${key}` };
    });

    await config.client.deleteObjects({
      Bucket: config.bucketName,
      Delete: { Objects: identifierList },
    }).promise();
  };
};
