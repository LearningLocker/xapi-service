import { v4 as uuid } from 'uuid';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
import Config from '../Config';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly extension: string;
  readonly etag: string;
  readonly registration?: string;
  readonly stateId: string;
}

export default (config: Config, opts: Options): State => {
  const state: State = {
    activityId: opts.activityId,
    agent: opts.agent,
    content: opts.content,
    contentType: opts.contentType,
    etag: opts.etag,
    extension: opts.extension,
    id: uuid(),
    lrs: opts.client.lrs_id,
    organisation: opts.client.organisation,
    registration: opts.registration,
    stateId: opts.stateId,
    updatedAt: new Date(),
  };
  config.state.states = [
    ...config.state.states,
    state,
  ];
  return state;
};
