import getFileExtension from './getFileExtension';

export interface GetAttachementFilenameOptions {
  readonly hash: string;
  readonly contentType: string;
}

export default (opts: GetAttachementFilenameOptions) => {
  const ext = getFileExtension(opts.contentType);
  return `${opts.hash}.${ext}`;
};
