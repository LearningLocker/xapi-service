// tslint:disable:max-file-line-count
import {
  ContainerURL, ServiceURL, SharedKeyCredential, StorageURL,
} from '@azure/storage-blob';
import Storage from '@google-cloud/storage';
import S3 from 'aws-sdk/clients/s3';
import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import config from '../../../config';
import logger from '../../../logger';
import azureStorageRepo from '../azureStorageRepo';
import fetchAuthRepo from '../fetchAuthRepo';
import googleStorageRepo from '../googleStorageRepo';
import localStorageRepo from '../localStorageRepo';
import mongoAuthRepo from '../mongoAuthRepo';
import mongoModelsRepo from '../mongoModelsRepo';
import s3StorageRepo from '../s3StorageRepo';
import testAuthRepo from '../testAuthRepo';
import AuthRepo from './AuthRepo';
import ModelsRepo from './ModelsRepo';
import Repo from './Repo';
import StorageRepo from './StorageRepo';

/* istanbul ignore next */
const getAuthRepo = (): AuthRepo => {
  switch (config.repoFactory.authRepoName) {
    case 'test':
      return testAuthRepo({});
    case 'fetch':
      return fetchAuthRepo({
        llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
      });
    default: case 'mongo':
      return mongoAuthRepo({
        db: connectToDb({
          dbName: config.mongoModelsRepo.dbName,
          logger,
          url: config.mongoModelsRepo.url,
        }),
      });
  }
};

/* istanbul ignore next */
const getModelsRepo = (): ModelsRepo => {
  switch (config.repoFactory.modelsRepoName) {
    default: case 'mongo':
      return mongoModelsRepo({
        db: connectToDb({
          dbName: config.mongoModelsRepo.dbName,
          logger,
          url: config.mongoModelsRepo.url,
        }),
      });
  }
};

/* istanbul ignore next */
const getStorageRepo = (): StorageRepo => {
  switch (config.repoFactory.storageRepoName) {
    case 's3':
      return s3StorageRepo({
        bucketName: config.s3StorageRepo.bucketName,
        client: new S3(config.s3StorageRepo.awsConfig) as any,
        subFolder: config.storageSubFolders.agents,
      });
    case 'google':
      return googleStorageRepo({
        bucketName: config.googleStorageRepo.bucketName,
        storage: Storage({
          keyFilename: config.googleStorageRepo.keyFileName,
          projectId: config.googleStorageRepo.projectId,
        }),
        subFolder: config.googleStorageRepo.subFolder.replace(/^\//, ''),
      });
    case 'azure':
      const credential = new SharedKeyCredential(
        config.azureStorageRepo.account,
        config.azureStorageRepo.accountKey,
      );
      const pipeline = StorageURL.newPipeline(credential);
      const serviceURL = new ServiceURL(
        `https://${config.azureStorageRepo.account}.blob.core.windows.net`, pipeline,
      );
      const containerUrl = ContainerURL.fromServiceURL(
        serviceURL,
        config.azureStorageRepo.containerName,
      );

      return azureStorageRepo({
        containerUrl,
        subFolder: config.azureStorageRepo.subFolder.replace(/^\//, ''),
      });
    default:
    case 'local':
      return localStorageRepo(config.localStorageRepo);
  }
};

export default (): Repo => {
  const authRepo = getAuthRepo();
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await modelsRepo.clearRepo();
      await storageRepo.clearRepo();
    },
    migrate: async () => {
      await modelsRepo.migrate();
      await storageRepo.migrate();
    },
    rollback: async () => {
      await modelsRepo.rollback();
      await storageRepo.rollback();
    },
  };
};
