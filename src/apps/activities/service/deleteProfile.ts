import NoModel from 'jscommons/dist/errors/NoModel';
import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import checkProfileWriteScopes from './utils/checkProfileWriteScopes';
import validateActivityId from './utils/validateActivityId';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const client = opts.client;
    checkProfileWriteScopes(client.scopes);
    validateActivityId(opts.activityId);

    try {
      const deleteResult = await config.repo.deleteProfile({
        activityId: opts.activityId,
        client,
        ifMatch: opts.ifMatch,
        profileId: opts.profileId,
      });

      if (deleteResult.contentType === jsonContentType) {
        return;
      }

      await config.repo.deleteProfileContent({
        key: `${deleteResult.id}.${deleteResult.extension}`,
        lrs_id: client.lrs_id,
      });
    } catch (err) {
      // If no profile was found, we will handle this as a 204 instead
      if (err instanceof NoModel) {
        return;
      }
      throw err;
    }
  };
};
