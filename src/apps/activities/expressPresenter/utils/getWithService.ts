import { Response } from 'express';
import { get } from 'lodash';
import Config from '../Config';
import getProfileFromService from './getProfileFromService';
import getProfilesFromService from './getProfilesFromService';

export interface Options {
  readonly query: any;
  readonly headers: any;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ config, query, res, headers }: Options) => {
  const queryProfileId = get(query, 'profileId') as string | undefined;

  if (queryProfileId === undefined) {
    return getProfilesFromService({ config, query, res, headers });
  } else {
    return getProfileFromService({ config, query, res, headers });
  }
};
