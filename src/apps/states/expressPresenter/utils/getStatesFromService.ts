import { Response } from 'express';
import { OK } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import validateVersionHeader from './validateVersionHeader';

export interface Options {
  readonly query: any;
  readonly headers: any;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ config, query, res, headers }: Options) => {
  const client = await getClient(config, get(headers, 'authorization'));
  validateVersionHeader(get(headers, 'x-experience-api-version'));

  const activityId = getActivityId(get(query, 'activityId'));
  const agent = getAgent(get(query, 'agent'));
  const registration = get(query, 'registration') as string | undefined;
  const since = get(query, 'since') as string | undefined;

  const getStatesResult = await config.service.getStates({
    activityId,
    agent,
    client,
    registration,
    since,
  });

  res.status(OK);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.json(getStatesResult.stateIds);
};
