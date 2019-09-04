import { Response } from 'express';
import { OK } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getAgent from './getAgent';
import getClient from './getClient';
import validateVersionHeader from './validateVersionHeader';

export interface Options {
  readonly query: any;
  readonly config: Config;
  readonly headers: any;
  readonly res: Response;
}

export default async ({ query, config, headers, res }: Options) => {
  const client = await getClient(config, get(headers, 'authorization', ''));
  validateVersionHeader(get(headers, 'x-experience-api-version'));

  const agent = getAgent(get(query, 'agent'));
  const since = get(query, 'since') as string | undefined;

  const getProfilesResult = await config.service.getProfiles({ agent, client, since });

  res.status(OK);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.json(getProfilesResult.profileIds);
};
