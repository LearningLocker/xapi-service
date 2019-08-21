import {
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
} from '@azure/storage-blob';
import Storage from '@google-cloud/storage';
import azureStorageRepo from '@learninglocker/xapi-activities/dist/azureStorageRepo';
import googleStorageRepo from '@learninglocker/xapi-activities/dist/googleStorageRepo';
import localStorageRepo from '@learninglocker/xapi-activities/dist/localStorageRepo';
import s3StorageRepo from '@learninglocker/xapi-activities/dist/s3StorageRepo';
import Repo from '@learninglocker/xapi-agents/dist/repoFactory/StorageRepo';
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
        subFolder: factoryConfig.azure.subFolder.replace(/^\//, ''),
      });
    default:
    case 'local': {
      return localStorageRepo({
        storageDir: factoryConfig.local.storageDir,
      });
    }
  }
};
