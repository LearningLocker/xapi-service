export interface GetAttachementDirOptions {
  subFolder?: string;
  lrs_id: string;
}

export default (opts: GetAttachementDirOptions) => (
  opts.subFolder !== undefined
    ? `${opts.subFolder}/${opts.lrs_id}/attachments`
    : `${opts.lrs_id}/attachments`
);
