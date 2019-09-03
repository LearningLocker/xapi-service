import { Response } from 'express';
import { get } from 'lodash';
import Config from '../Config';
import deleteStateFromService from './deleteStateFromService';
import deleteStatesFromService from './deleteStatesFromService';

export interface Options {
  readonly query: any;
  readonly headers: any;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ config, res, query, headers }: Options) => {
  const queryStateId = get(query, 'stateId') as string | undefined;

  if (queryStateId === undefined) {
    return deleteStatesFromService({ config, res, query, headers });
  } else {
    return deleteStateFromService({ config, res, query, headers });
  }
};
