import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import matchProfileIdentifier from './matchProfileIdentifier';

export interface Options {
  readonly client: ClientModel;
  readonly activityId: string;
  readonly profile: Profile;
  readonly profileId: string;
}

export default ({ client, activityId, profile, profileId }: Options) => {
  return (
    matchProfileIdentifier({ client, activityId, profile }) &&
    profile.profileId === profileId
  );
};
