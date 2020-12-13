import { S3 } from 'aws-sdk';
import getStorageDir from '../../utils/getStorageDir';
import { DeleteActivityProfileContentOptions } from './deleteActivityProfileContent';
import { S3FileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';

export async function deleteActivityProfileContentFromS3(
  config: S3FileStorageConfig,
  opts: DeleteActivityProfileContentOptions,
): Promise<void> {
  const client = new S3({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
    region: config.awsRegion,
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
    sslEnabled: true,
  });
  const profileDir = getStorageDir({
    subfolder: config.s3SubFolder,
    lrs_id: opts.lrs_id,
  });
  const filePath = `${profileDir}/${opts.key}`;
  await client.deleteObject({
    Bucket: config.s3BucketName,
    Key: filePath,
  }).promise();
}
