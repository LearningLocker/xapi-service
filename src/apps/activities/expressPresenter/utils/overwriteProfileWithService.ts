import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
import getClient from './getClient';
import getContentType from './getContentType';
import getEtag from './getEtag';
import getProfileId from './getProfileId';
import validateVersionHeader from './validateVersionHeader';

export interface Options {
  readonly query: any;
  readonly config: Config;
  readonly headers: any;
  readonly res: Response;
  readonly content: NodeJS.ReadableStream;
}

export default async ({ query, config, headers, res, content }: Options) => {
  const client = await getClient(config, get(headers, 'authorization', ''));
  validateVersionHeader(get(headers, 'x-experience-api-version'));

  const contentType = getContentType(get(headers, 'content-type'));
  const ifMatch = getEtag(get(headers, 'if-match'));
  const ifNoneMatch = getEtag(get(headers, 'if-none-match'));
  const activityId = getActivityId(get(query, 'activityId'));
  const profileId = getProfileId(get(query, 'profileId'));

  await config.service.overwriteProfile({
    activityId,
    client,
    content,
    contentType,
    ifMatch,
    ifNoneMatch,
    profileId,
  });

  res.status(StatusCodes.NO_CONTENT);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.send();
};
