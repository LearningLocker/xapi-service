
import { Aborter, BlobURL } from '@azure/storage-blob';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/azureStorage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });

    const blobUrl = BlobURL.fromContainerURL(config.containerUrl, filePath);
    const file = (await blobUrl.download(Aborter.none, 0));
    const stream = file.readableStreamBody as NodeJS.ReadableStream;
    const contentLength = file.contentLength;

    return { stream, contentLength };
  };
};
