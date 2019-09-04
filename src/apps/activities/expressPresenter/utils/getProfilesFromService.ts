import { Response } from 'express';
import { OK } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
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

  const activityId = getActivityId(get(query, 'activityId'));
  const since = get(query, 'since') as string | undefined;

  const getProfilesResult = await config.service.getProfiles({ activityId, client, since });

  res.status(OK);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.json(getProfilesResult.profileIds);
};
