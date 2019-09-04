import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import GetProfilesResult from '../serviceFactory/results/GetProfilesResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import validateActivityId from './utils/validateActivityId';
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
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    checkProfileReadScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    const since = getSince(opts.since);
    const profileIds = (await config.repo.getProfiles({
      activityId: opts.activityId,
      client: opts.client,
      since,
    })).profileIds;

    return { profileIds };
  };
};
