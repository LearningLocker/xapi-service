import { Readable } from 'stream';
import { Blob } from 'buffer';
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { stringToStream } from '../../../../../utils/stringToStream';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import getStreamData from '../../../utils/getStreamData';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });

    const objectConfig = {
      Bucket: config.bucketName,
      Key: filePath,
    };

    const s3HeadObjectCommand = new HeadObjectCommand(objectConfig);
    const s3HeadObject = await config.client.send(s3HeadObjectCommand);

    const contentLength = s3HeadObject.ContentLength;

    const getObjectCommand = new GetObjectCommand({
      ...objectConfig,
      ResponseContentEncoding: 'binary',
    });
    const { Body } = await config.client.send(getObjectCommand);

    if (Body === undefined) {
      throw new Error('Object body not found');
    }

    const body = Body instanceof Blob ? Readable.from(await Body.text()) : (Body as Readable);

    const streamAsString = await getStreamData(body);
    const streamAsStream = stringToStream(streamAsString);
    return { stream: streamAsStream, contentLength };
  };
};
