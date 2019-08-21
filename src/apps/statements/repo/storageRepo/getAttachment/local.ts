import * as fs from 'fs-extra';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/localStorage/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.storageDir, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });
    const isExisting = await fs.pathExists(filePath);
    if (!isExisting) {
      throw new Error(`Missing attachment file path ${filePath}`);
    }
    const stream = fs.createReadStream(filePath, { encoding: 'binary' });
    const stats = await fs.stat(filePath);
    const contentLength = stats.size;
    return { stream, contentLength };
  };
};
