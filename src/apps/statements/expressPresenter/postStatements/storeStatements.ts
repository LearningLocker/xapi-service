import { Response } from 'express';
import { isArray } from 'lodash';
import ClientModel from '../../models/ClientModel';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';

export interface Options {
  readonly config: Config;
  readonly client: ClientModel;
  readonly body: any;
  readonly attachments: any[];
  readonly res: Response;
}

export default async ({ config, client, body, attachments, res }: Options) => {
  const models = isArray(body) ? body : [body];
  const ids = await config.service.storeStatements({ models, attachments, client });
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.status(200);
  res.json(ids);
};
