import { join } from 'path';

export interface GetStorageDirOptions {
  readonly subfolder?: string;
  readonly lrs_id: string;
}

const getSubFolderPath = (subfolder?: string) => {
  /* istanbul ignore if - Just being cautious. */
  if (subfolder === undefined) {
    return [];
  }
  return [subfolder];
};

export default (opts: GetStorageDirOptions) =>
  join(...getSubFolderPath(opts.subfolder), opts.lrs_id, 'agentProfiles');
