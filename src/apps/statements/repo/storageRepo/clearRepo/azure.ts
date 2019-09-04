import {
  Aborter,
  BlobURL,
  Models,
} from '@azure/storage-blob';
import FacadeConfig from '../utils/azureStorage/FacadeConfig';

export default (config: FacadeConfig) => {
  return async (): Promise<void> => {
    // tslint:disable-next-line:no-let
    let marker;
    do {
      const listBlobsResponse: Models.ContainerListBlobFlatSegmentResponse =
        await config.containerUrl.listBlobFlatSegment(Aborter.none, marker);
      marker = listBlobsResponse.nextMarker;
      const deletePromises = listBlobsResponse.segment.blobItems.map(
        async (blobItem: Models.BlobItem) => {
          const blobUrl = BlobURL.fromContainerURL(config.containerUrl, blobItem.name);
          await blobUrl.delete(Aborter.none);
        },
      );
      await Promise.all(deletePromises);
    } while (marker !== '');
  };
};
