import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import getProfilesFilter from './getProfilesFilter';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly profileId: string;
}

export default (opts: Options) => {
  return {
    ...getProfilesFilter(opts),
    profileId: opts.profileId,
  };
};
