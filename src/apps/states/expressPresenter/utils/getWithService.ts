import { Response } from 'express';
import { get } from 'lodash';
import Config from '../Config';
import getStateFromService from './getStateFromService';
import getStatesFromService from './getStatesFromService';

export interface Options {
  readonly query: any;
  readonly headers: any;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ config, query, res, headers }: Options) => {
  const queryStateId = get(query, 'stateId') as string | undefined;

  if (queryStateId === undefined) {
    return getStatesFromService({ config, query, res, headers });
  } else {
    return getStateFromService({ config, query, res, headers });
  }
};
