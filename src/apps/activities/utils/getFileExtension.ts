import { extension } from 'mime-types';
import { jsonContentType } from '../utils/constants';

export default (contentType: string) => {
  if (contentType === jsonContentType) {
    return 'json';
  }
  const ext = extension(contentType);
  if (ext === false) {
    return 'bin';
  }
  return ext;
};
