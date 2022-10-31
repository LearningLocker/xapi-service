import { ObjectId } from 'mongodb';
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
    lrs: new ObjectId(opts.client.lrs_id),
    organisation: new ObjectId(opts.client.organisation),
  };
};
