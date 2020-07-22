import config from '../../../config';
import factory from './factory';
import Repo from './Repo';
import connectToMongoDb from './utils/connectToMongoDb';
import connectToRedis from './utils/connectToRedis';
import connectToSentinel from './utils/connectToSentinel';

const repo: Repo = factory({
  auth: {
    facade: config.repoFactory.authRepoName,
    fake: {},
    fetch: {
      llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
    },
    mongo: {
      db: connectToMongoDb(),
    },
  },
  events: {
    facade: config.repoFactory.eventsRepoName,
    redis: {
      client: connectToRedis(),
      prefix: config.redis.prefix,
    },
    sentinel: {
      client: connectToSentinel(),
      prefix: config.sentinel.prefix,
    },
  },
  models: {
    facade: config.repoFactory.modelsRepoName,
    mongo: {
      db: connectToMongoDb(),
      maxTimeMs: config.defaultTimeout,
    },
  },
  storage: {
    facade: config.repoFactory.storageRepoName,
    local: {
      storageDir: config.localStorageRepo.storageDir,
    },
    s3: {
      awsConfig: config.s3StorageRepo.awsConfig,
      bucketName: config.s3StorageRepo.bucketName,
      subFolder: config.storageSubFolders.statements,
    },
    google: {
      bucketName: config.googleStorageRepo.bucketName,
      keyFileName: config.googleStorageRepo.keyFileName,
      projectId: config.googleStorageRepo.projectId,
      subFolder: config.googleStorageRepo.subFolder,
    },
    azure: {
      account: config.azureStorageRepo.account,
      accountKey: config.azureStorageRepo.accountKey,
      containerName: config.azureStorageRepo.containerName,
      subFolder: config.azureStorageRepo.subFolder,
    },
  },
});

export default repo;
