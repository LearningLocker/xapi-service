import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isArray } from 'lodash';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import ClientModel from '../../models/ClientModel';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';

export interface Options {
  readonly config: Config;
  readonly client: ClientModel;
  readonly priority: StatementProcessingPriority;
  readonly body: any;
  readonly attachments: any[];
  readonly res: Response;
}

export default async ({ config, client, priority, body, attachments, res }: Options) => {
  const models = isArray(body) ? body : [body];
  const ids = await config.service.storeStatements({ priority, models, attachments, client });
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.status(StatusCodes.OK);
  res.json(ids);
};
