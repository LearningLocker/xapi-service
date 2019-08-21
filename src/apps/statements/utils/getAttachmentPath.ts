import getAttachmentFilename from './getAttachmentFilename';

export interface GetAttachementPathOptions {
  dir: string;
  hash: string;
  contentType: string;
}

export default (opts: GetAttachementPathOptions) => {
  const filename = getAttachmentFilename(opts);
  return `${opts.dir}/${filename}`;
};
