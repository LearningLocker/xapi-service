import NoModel from 'jscommons/dist/errors/NoModel';
import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import checkProfileWriteScopes from './utils/checkProfileWriteScopes';
import validateAgent from './utils/validateAgent';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<void> => {
    const client = opts.client;
    checkProfileWriteScopes(client.scopes);
    validateAgent(opts.agent);

    try {
      const deleteResult = await config.repo.deleteProfile({
        agent: opts.agent,
        client,
        ifMatch: opts.ifMatch,
        profileId: opts.profileId,
      });

      if (deleteResult.contentType === jsonContentType) {
        return;
      }

      await config.repo.deleteProfileContent({
        key: `${deleteResult.id}.${deleteResult.extension}`,
        lrs_id: opts.client.lrs_id,
      });
    } catch (err) {
      if (err instanceof NoModel) {
        return;
      }
      /* istanbul ignore next */
      throw err;
    }
  };
};
