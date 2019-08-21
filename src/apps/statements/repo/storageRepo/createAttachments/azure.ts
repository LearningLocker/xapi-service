import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  uploadStreamToBlockBlob,
} from '@azure/storage-blob';
import { Readable } from 'stream';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/azureStorage/FacadeConfig';
import Signature from './Signature';

const BYTES_IN_KILOBYTES = 1024;
const KILOBYTES_IN_MEGABYTES = 1024;
const FOUR = 4;

// https://github.com/Azure/azure-storage-js/blob/master/blob/samples/highlevel.sample.js
const BUFFER_SIZE = FOUR * KILOBYTES_IN_MEGABYTES * BYTES_IN_KILOBYTES; // 4MB
const MAX_BUFFERS = 20;

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });

    const promises = models.map(async (model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType,
      });

      const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
      const blockBlobUrl = BlockBlobURL.fromBlobURL(blobUrl);

      await uploadStreamToBlockBlob(
        Aborter.none,
        model.stream as Readable,
        blockBlobUrl,
        BUFFER_SIZE,
        MAX_BUFFERS,
      );
    });

    await Promise.all(promises);
  };
};
