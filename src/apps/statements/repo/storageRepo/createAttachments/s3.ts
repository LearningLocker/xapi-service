import { Upload } from '@aws-sdk/lib-storage';
import streamToString from 'stream-to-string';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const promises = models.map(async (model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType,
      });
      const content = await streamToString(model.stream);
      const target = {
        Body: Buffer.from(content, 'binary'),
        Bucket: config.bucketName,
        Key: filePath,
        ContentEncoding: 'binary',
        ContentLength: content.length,
      };
      const upload = new Upload({
        client: config.client,
        params: target,
      });

      await upload.done();
    });
    await Promise.all(promises);
  };
};
