export interface GetAttachementDirOptions {
  readonly subFolder?: string;
  readonly lrs_id: string;
}

export default (opts: GetAttachementDirOptions) => (
  opts.subFolder !== undefined
    ? `${opts.subFolder}/${opts.lrs_id}/attachments`
    : `${opts.lrs_id}/attachments`
);
