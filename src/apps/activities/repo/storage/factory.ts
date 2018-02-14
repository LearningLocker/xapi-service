import * as Storage from '@google-cloud/storage';
import googleStorageRepo from '@learninglocker/xapi-activities/dist/googleStorageRepo';
import localStorageRepo from '@learninglocker/xapi-activities/dist/localStorageRepo';
import s3StorageRepo from '@learninglocker/xapi-activities/dist/s3StorageRepo';
import { S3 } from 'aws-sdk';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig) => {
  switch (factoryConfig.factoryName) {
    case 's3':
      return s3StorageRepo({
        bucketName: factoryConfig.s3.bucketName,
        client: new S3(factoryConfig.s3.awsConfig),
        subFolder: factoryConfig.s3.subFolder,
      });
    case 'google':
      return googleStorageRepo({
        bucketName: factoryConfig.google.bucketName,
        storage: Storage({
          keyFilename: factoryConfig.google.keyFileName,
          projectId: factoryConfig.google.projectId,
        }),
        subFolder: factoryConfig.google.subFolder.replace(/^\//, ''),
      });
    default:
    case 'local': {
      return localStorageRepo({
        storageDir: factoryConfig.local.storageDir,
      });
    }
  }
};
