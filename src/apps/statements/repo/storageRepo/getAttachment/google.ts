import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/googleStorage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });

    const file = config.storage.bucket(config.bucketName).file(filePath);
    console.debug('reading metadata from Google', config.bucketName, filePath);
    const [metadata] = await file.getMetadata();
    const contentLength = metadata.size;
    console.debug('reading file from Google', config.bucketName, filePath);
    const stream = file.createReadStream();

    return { stream, contentLength };
  };
};
