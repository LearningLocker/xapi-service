import getFileExtension from './getFileExtension';

export interface GetAttachementFilenameOptions {
  hash: string;
  contentType: string;
}

export default (opts: GetAttachementFilenameOptions) => {
  const ext = getFileExtension(opts.contentType);
  return `${opts.hash}.${ext}`;
};
