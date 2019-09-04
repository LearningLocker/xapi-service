import HasProfileOptions from '../repoFactory/options/HasProfileOptions';
import HasProfileResult from '../repoFactory/results/HasProfileResult';
import Config from './Config';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async ({ client, agent, profileId }: HasProfileOptions): Promise<HasProfileResult> => {
    const matchingProfiles = config.state.agentProfiles.filter((profile) => {
      return matchUniqueProfile({ client, agent, profile, profileId });
    });

    const hasProfile = matchingProfiles.length !== 0;
    return { hasProfile };
  };
};
