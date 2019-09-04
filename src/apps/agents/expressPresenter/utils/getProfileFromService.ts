import { Response } from 'express';
import { OK } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getAgent from './getAgent';
import getClient from './getClient';
import getProfileId from './getProfileId';
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
  const profileId = getProfileId(get(query, 'profileId'));

  const getProfileResult = await config.service.getProfile({ agent, client, profileId });

  res.status(OK);
  res.setHeader('ETag', `"${getProfileResult.etag}"`);
  res.setHeader('Last-Modified', getProfileResult.updatedAt.toISOString());
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.setHeader('Content-Type', getProfileResult.contentType);
  getProfileResult.content.pipe(res);
};
