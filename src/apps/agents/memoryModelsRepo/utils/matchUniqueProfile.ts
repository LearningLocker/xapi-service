import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import matchProfileIdentifier from './matchProfileIdentifier';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly profile: Profile;
  readonly profileId: string;
}

export default ({ client, agent, profile, profileId }: Options) => {
  return (
    matchProfileIdentifier({ client, agent, profile }) &&
    profile.profileId === profileId
  );
};
