import { join } from 'path';

export interface GetStorageDirOptions {
  readonly subfolder?: string;
  readonly lrs_id: string;
}

export default (opts: GetStorageDirOptions) => {
  return join(
    ...(opts.subfolder !== undefined ? [opts.subfolder] : []),
    opts.lrs_id,
    'activityProfiles',
  );
};
