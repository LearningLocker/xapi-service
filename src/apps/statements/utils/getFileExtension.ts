import { extension } from 'mime-types';

export default (contentType: string) => {
  const ext = extension(contentType);
  if (ext === false) { return 'bin'; }
  return ext;
};
