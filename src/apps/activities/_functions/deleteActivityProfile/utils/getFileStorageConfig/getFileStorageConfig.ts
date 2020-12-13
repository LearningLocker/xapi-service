import config from '../../../../../../config';
import { FileStorageConfig, FileStorageProvider } from './FileStorageConfig';

export function getFileStorageConfig(): FileStorageConfig {
  switch (config.repoFactory.storageRepoName) {
    case FileStorageProvider.Azure: return {
      fileStorageProvider: FileStorageProvider.Azure,
      azureAccount: config.azureStorageRepo.account,
      azureAccountKey: config.azureStorageRepo.accountKey,
      azureContainerName: config.azureStorageRepo.containerName,
      azureSubFolder: config.storageSubFolders.activities,
    };
    case FileStorageProvider.Google: return {
      fileStorageProvider: FileStorageProvider.Google,
      googleBucketName: config.googleStorageRepo.bucketName,
      googleKeyFileName: config.googleStorageRepo.keyFileName,
      googleProjectId: config.googleStorageRepo.projectId,
      googleSubFolder: config.storageSubFolders.activities,
    };
    case FileStorageProvider.S3: return {
      fileStorageProvider: FileStorageProvider.S3,
      s3BucketName: config.s3StorageRepo.bucketName,
      s3SubFolder: config.storageSubFolders.activities,
      awsAccessKeyId: config.s3StorageRepo.awsConfig.accessKeyId as string,
      awsSecretAccessKey: config.s3StorageRepo.awsConfig.secretAccessKey as string,
      awsRegion: config.s3StorageRepo.awsConfig.region as string,
    };
    default: case FileStorageProvider.Local: return {
      fileStorageProvider: FileStorageProvider.Local,
      localStorageDir: `${config.localStorageRepo.storageDir}/${config.storageSubFolders.activities}`,
    };
  }
}
