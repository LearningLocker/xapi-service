import { deleteActivityProfileContentFromAzure } from './deleteActivityProfileContentFromAzure';
import { deleteActivityProfileContentFromFS } from './deleteActivityProfileContentFromFS';
import { deleteActivityProfileContentFromGoogle } from './deleteActivityProfileContentFromGoogle';
import { deleteActivityProfileContentFromS3 } from './deleteActivityProfileContentFromS3';
import { FileStorageConfig, FileStorageProvider } from './utils/getFileStorageConfig/FileStorageConfig';

export interface DeleteActivityProfileContentOptions {
  readonly key: string;
  readonly lrs_id: string;
}

export async function deleteActivityProfileContent(
  config: FileStorageConfig,
  opts: DeleteActivityProfileContentOptions,
): Promise<void> {
  switch (config.fileStorageProvider) {
    case FileStorageProvider.S3:
      return deleteActivityProfileContentFromS3(config, opts);
    case FileStorageProvider.Google:
      return deleteActivityProfileContentFromGoogle(config, opts);
    case FileStorageProvider.Azure:
      return deleteActivityProfileContentFromAzure(config, opts);
    default:
    case FileStorageProvider.Local: {
      return deleteActivityProfileContentFromFS(config, opts);
    }
  }
}
