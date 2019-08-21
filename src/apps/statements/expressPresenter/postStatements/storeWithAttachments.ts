import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import Config from '../Config';
import getClient from '../utils/getClient';
import getMultipartStatements from '../utils/getMultipartStatements';
import storeStatements from './storeStatements';

export interface Options {
  readonly config: Config;
  readonly req: Request;
  readonly res: Response;
}

export default async ({ config, req, res }: Options) => {
  const client = await getClient(config, defaultTo(req.header('Authorization'), ''));
  const { body, attachments } = await getMultipartStatements(req);
  return storeStatements({ config, client, body, attachments, res });
};
