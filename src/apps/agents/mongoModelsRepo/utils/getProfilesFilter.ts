import { ObjectID } from 'mongodb';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import getAgentFilter from './getAgentFilter';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
}

export default (opts: Options) => {
  return {
    ...getAgentFilter(opts.agent),
    lrs: new ObjectID(opts.client.lrs_id),
    organisation: new ObjectID(opts.client.organisation),
  };
};
