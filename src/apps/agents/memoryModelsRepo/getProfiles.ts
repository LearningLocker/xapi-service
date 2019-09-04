import Profile from '../models/Profile';
import GetProfilesOptions from '../repoFactory/options/GetProfilesOptions';
import GetProfilesResult from '../repoFactory/results/GetProfilesResult';
import Config from './Config';
import matchProfileIdentifier from './utils/matchProfileIdentifier';

const matchProfileSince = (profile: Profile, since?: Date) => {
  return since === undefined ? true : profile.updatedAt > since;
};

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    const client = opts.client;
    const agent = opts.agent;
    const matchingProfiles = config.state.agentProfiles.filter((profile) => {
      return (
        matchProfileIdentifier({ client, agent, profile }) &&
        matchProfileSince(profile, opts.since)
      );
    });

    const profileIds = matchingProfiles.map((profile) => {
      return profile.profileId;
    });

    return { profileIds };
  };
};
