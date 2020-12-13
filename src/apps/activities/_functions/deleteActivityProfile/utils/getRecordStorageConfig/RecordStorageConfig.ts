export interface MongoRecordStorageConfig {
  readonly recordStorageProvider: RecordStorageProvider.Mongo;
  readonly mongoUri: string;
  readonly mongoDbName: string;
}

export enum RecordStorageProvider {
  Mongo = 'mongo',
}
