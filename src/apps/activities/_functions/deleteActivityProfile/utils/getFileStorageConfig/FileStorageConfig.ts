export type FileStorageConfig = (
  S3FileStorageConfig | GoogleFileStorageConfig | AzureFileStorageConfig | LocalFileStorageConfig
);

export enum FileStorageProvider {
  Azure = 'azure',
  Google = 'google',
  Local = 'local',
  S3 = 's3',
}

export interface AzureFileStorageConfig {
  readonly fileStorageProvider: FileStorageProvider.Azure;
  readonly azureAccount: string;
  readonly azureAccountKey: string;
  readonly azureContainerName: string;
  readonly azureSubFolder: string;
}

export interface GoogleFileStorageConfig {
  readonly fileStorageProvider: FileStorageProvider.Google;
  readonly googleBucketName: string;
  readonly googleKeyFileName: string;
  readonly googleProjectId: string;
  readonly googleSubFolder: string;
}

export interface LocalFileStorageConfig {
  readonly fileStorageProvider: FileStorageProvider.Local;
  readonly localStorageDir: string;
}

export interface S3FileStorageConfig {
  readonly fileStorageProvider: FileStorageProvider.S3;
  readonly s3BucketName: string;
  readonly s3SubFolder: string;
  readonly awsAccessKeyId: string;
  readonly awsSecretAccessKey: string;
  readonly awsRegion: string;
}
