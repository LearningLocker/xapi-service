import {
  Aborter,
  BlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
} from '@azure/storage-blob';
import getStorageDir from '../../utils/getStorageDir';
import { DeleteActivityProfileContentOptions } from './deleteActivityProfileContent';
import { AzureFileStorageConfig } from './utils/getFileStorageConfig/FileStorageConfig';

export async function deleteActivityProfileContentFromAzure(
  config: AzureFileStorageConfig,
  opts: DeleteActivityProfileContentOptions,
): Promise<void> {
  const credential = new SharedKeyCredential(
    config.azureAccount,
    config.azureAccountKey,
  );
  const pipeline = StorageURL.newPipeline(credential);
  const serviceURL = new ServiceURL(
    `https://${config.azureAccount}.blob.core.windows.net`,
    pipeline,
  );
  const containerUrl = ContainerURL.fromServiceURL(serviceURL, config.azureContainerName);
  const profileDir = getStorageDir({
    subfolder: config.azureSubFolder,
    lrs_id: opts.lrs_id,
  });
  const filePath = `${profileDir}/${opts.key}`;
  const blobUrl = BlobURL.fromContainerURL(containerUrl, filePath);
  await blobUrl.delete(Aborter.none);
}
