import * as fs from 'fs-extra';
import streamToString from 'stream-to-string';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/localStorage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.storageDir, lrs_id });
    await fs.ensureDir(dir);
    const promises = models.map(async (model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType,
      });
      const content = await streamToString(model.stream);
      await fs.writeFile(filePath, content, { encoding: 'binary' });
    });
    await Promise.all(promises);
  };
};
