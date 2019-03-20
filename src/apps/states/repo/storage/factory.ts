import {
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
} from '@azure/storage-blob';
import * as Storage from '@google-cloud/storage';
import azureStorageRepo from '@learninglocker/xapi-activities/dist/azureStorageRepo';
import googleStorageRepo from '@learninglocker/xapi-state/dist/googleStorageRepo';
import localStorageRepo from '@learninglocker/xapi-state/dist/localStorageRepo';
import Repo from '@learninglocker/xapi-state/dist/repoFactory/StorageRepo';
import s3StorageRepo from '@learninglocker/xapi-state/dist/s3StorageRepo';
import { S3 } from 'aws-sdk';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
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
    case 'azure':
      const credential = new SharedKeyCredential(
        factoryConfig.azure.account,
        factoryConfig.azure.accountKey,
      );
      const pipeline = StorageURL.newPipeline(credential);
      const serviceURL = new ServiceURL(
        `https://${factoryConfig.azure.account}.blob.core.windows.net`, pipeline,
      );
      const containerUrl = ContainerURL.fromServiceURL(
        serviceURL,
        factoryConfig.azure.containerName,
      );

       return azureStorageRepo({
        containerUrl,
      });
    default:
    case 'local': {
      return localStorageRepo({
        storageDir: factoryConfig.local.storageDir,
      });
    }
  }
};
