import config from '../../../../../../config';
import { MongoRecordStorageConfig, RecordStorageProvider } from './RecordStorageConfig';

export function getRecordStorageConfig(): MongoRecordStorageConfig {
  switch (config.repoFactory.modelsRepoName) {
    default: case RecordStorageProvider.Mongo: return {
      recordStorageProvider: RecordStorageProvider.Mongo,
      mongoDbName: config.mongoModelsRepo.dbName,
      mongoUri: config.mongoModelsRepo.url,
    };
  }
}
