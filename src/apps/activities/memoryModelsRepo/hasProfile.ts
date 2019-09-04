import HasProfileOptions from '../repoFactory/options/HasProfileOptions';
import HasProfileResult from '../repoFactory/results/HasProfileResult';
import Config from './Config';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (
    { client, activityId, profileId}: HasProfileOptions,
  ): Promise<HasProfileResult> => {
    const matchingProfiles = config.state.activityProfiles.filter((profile) => {
      return matchUniqueProfile({ client, activityId, profile, profileId });
    });

    const hasProfile = matchingProfiles.length !== 0;
    return { hasProfile };
  };
};
