import DeleteStatesOptions from '../serviceFactory/options/DeleteStatesOptions';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: DeleteStatesOptions): Promise<void> => {
    const client = opts.client;
    checkStateWriteScopes(client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    const deleteResult = await config.repo.deleteStates({
      activityId: opts.activityId,
      agent: opts.agent,
      client,
      registration: opts.registration,
    });

    const keysToDelete = deleteResult.states.filter((state) => {
      return state.content === undefined;
    }).map((state) => { return `${state.id}.${state.extension}`; });

    await config.repo.deleteStatesContent({
      keys: keysToDelete,
      lrs_id: client.lrs_id,
    });
  };
};
