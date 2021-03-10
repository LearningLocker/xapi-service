export enum RecordStorageProvider {
  Mongo = 'mongo',
}

export interface MongoRecordStorageConfig {
  readonly recordStorageProvider: RecordStorageProvider.Mongo;
  readonly mongoUri: string;
  readonly mongoDbName: string;
}
