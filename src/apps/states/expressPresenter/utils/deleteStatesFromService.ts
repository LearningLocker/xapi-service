import { Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
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

export default async ({ config, res, query, headers }: Options) => {
  const client = await getClient(config, get(headers, 'authorization'));
  validateVersionHeader(get(headers, 'x-experience-api-version'));

  const agent = getAgent(get(query, 'agent'));
  const activityId = getActivityId(get(query, 'activityId'));
  const registration = get(query, 'registration') as string | undefined;

  await config.service.deleteStates({ activityId, agent, client, registration });
  res.status(NO_CONTENT).setHeader('x-experience-api-version', xapiHeaderVersion);
  res.send();
};
