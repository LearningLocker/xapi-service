import { Response } from 'express';
import { OK } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import getStateId from './getStateId';
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

  const activityId = getActivityId(get(query, 'activityId'));
  const agent = getAgent(get(query, 'agent'));
  const registration = get(query, 'registration') as string | undefined;
  const stateId = getStateId(get(query, 'stateId'));

  const getStateResult = await config.service.getState({
    activityId,
    agent,
    client,
    registration,
    stateId,
  });

  res.status(OK);
  res.setHeader('ETag', `"${getStateResult.etag}"`);
  res.setHeader('Last-Modified', getStateResult.updatedAt.toISOString());
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.setHeader('Content-Type', getStateResult.contentType);
  getStateResult.content.pipe(res);
};
