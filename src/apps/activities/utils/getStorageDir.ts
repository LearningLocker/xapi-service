import { join } from 'path';

export interface GetStorageDirOptions {
  readonly subfolder?: string;
  readonly lrs_id: string;
}

export default (opts: GetStorageDirOptions) => {
  return join(
    /* istanbul ignore next - Just being cautious. */
    ...(opts.subfolder !== undefined ? [opts.subfolder] : []),
    opts.lrs_id,
    'activityProfiles',
  );
};
