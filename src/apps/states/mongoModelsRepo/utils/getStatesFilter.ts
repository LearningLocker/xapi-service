import { ObjectID } from 'mongodb';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import getAgentFilter from './getAgentFilter';
import getRegistrationFilter from './getRegistrationFilter';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly registration?: string;
}

export default (opts: Options) => {
  return {
    activityId: opts.activityId,
    ...getAgentFilter(opts.agent),
    ...getRegistrationFilter(opts.registration),
    lrs: new ObjectID(opts.client.lrs_id),
    organisation: new ObjectID(opts.client.organisation),
  };
};
