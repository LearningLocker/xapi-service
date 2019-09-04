import { Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
import getStateId from './getStateId';
import validateVersionHeader from './validateVersionHeader';

export interface Options {
  readonly query: any;
  readonly headers: any;
  readonly content: NodeJS.ReadableStream;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ config, res, query, headers, content }: Options) => {
  const client = await getClient(config, get(headers, 'authorization'));
  validateVersionHeader(get(headers, 'x-experience-api-version'));

  const contentType = getContentType(get(headers, 'content-type'));
  const activityId = getActivityId(get(query, 'activityId'));
  const agent = getAgent(get(query, 'agent'));
  const stateId = getStateId(get(query, 'stateId'));
  const registration = get(query, 'registration') as string | undefined;

  await config.service.overwriteState({
    activityId,
    agent,
    client,
    content,
    contentType,
    registration,
    stateId,
  });
  res.status(NO_CONTENT).setHeader('x-experience-api-version', xapiHeaderVersion);
  res.send();
  return;
};
