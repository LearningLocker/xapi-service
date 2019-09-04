import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import isMatchingAgent from './isMatchingAgent';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly profile: Profile;
}

export default ({ client, agent, profile }: Options) => {
  return (
    profile.organisation === client.organisation &&
    profile.lrs === client.lrs_id &&
    isMatchingAgent(profile.agent, agent)
  );
};
