import {
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
} from '@azure/storage-blob';
import Storage from '@google-cloud/storage';
import S3 from 'aws-sdk/clients/s3';
import azureStorageRepo from '../../azureStorageRepo';
import googleStorageRepo from '../../googleStorageRepo';
import localStorageRepo from '../../localStorageRepo';
import Repo from '../../repoFactory/StorageRepo';
import s3StorageRepo from '../../s3StorageRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 's3':
      return s3StorageRepo({
        bucketName: factoryConfig.s3.bucketName,
        client: new S3(factoryConfig.s3.awsConfig) as any,
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
