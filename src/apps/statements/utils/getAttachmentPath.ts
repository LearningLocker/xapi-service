import getAttachmentFilename from './getAttachmentFilename';

export interface GetAttachementPathOptions {
  readonly dir: string;
  readonly hash: string;
  readonly contentType: string;
}

export default (opts: GetAttachementPathOptions) => {
  const filename = getAttachmentFilename(opts);
  return `${opts.dir}/${filename}`;
};
