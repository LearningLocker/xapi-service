import stringToStream from 'string-to-stream';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import getStreamData from '../../../utils/getStreamData';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });
    const s3HeadObject = await config.client
      .headObject({
        Bucket: config.bucketName,
        Key: filePath,
      })
      .promise();
    const contentLength = s3HeadObject.ContentLength;
    const stream = config.client
      .getObject({ Bucket: config.bucketName, Key: filePath, ResponseContentEncoding: 'binary' })
      .createReadStream();
    const streamAsString = await getStreamData(stream);
    const streamAsStream = stringToStream(streamAsString);
    return { stream: streamAsStream, contentLength };
  };
};
