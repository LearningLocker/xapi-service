import GetStatesOptions from '../serviceFactory/options/GetStatesOptions';
import GetStatesResult from '../serviceFactory/results/GetStatesResult';
import Config from './Config';
import checkStateReadScopes from './utils/checkStateReadScopes';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';
import validateSince from './utils/validateSince';

const getSince = (since?: string): Date|undefined => {
  if (since !== undefined) {
    validateSince(since);
    return new Date(since);
  } else {
    return undefined;
  }
};

export default (config: Config) => {
  return async (opts: GetStatesOptions): Promise<GetStatesResult> => {
    checkStateReadScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    const since = getSince(opts.since);
    const stateIds = (await config.repo.getStates({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      registration: opts.registration,
      since,
    })).stateIds;

    return { stateIds };
  };
};
