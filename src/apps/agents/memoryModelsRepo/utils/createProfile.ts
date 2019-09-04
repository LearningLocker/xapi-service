import { v4 as uuid } from 'uuid';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Profile from '../../models/Profile';
import Config from '../Config';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly etag: string;
  readonly extension: string;
  readonly profileId: string;
}

export default (config: Config, opts: Options): Profile => {
  const profile: Profile = {
    agent: opts.agent,
    content: opts.content,
    contentType: opts.contentType,
    etag: opts.etag,
    extension: opts.extension,
    id: uuid(),
    lrs: opts.client.lrs_id,
    organisation: opts.client.organisation,
    profileId: opts.profileId,
    updatedAt: new Date(),
  };
  config.state.agentProfiles = [
    ...config.state.agentProfiles,
    profile,
  ];
  return profile;
};
