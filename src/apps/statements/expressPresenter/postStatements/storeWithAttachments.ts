import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import Config from '../Config';
import getClient from '../utils/getClient';
import getMultipartStatements from '../utils/getMultipartStatements';
import { validateStatementProcessingPriority } from '../utils/validateStatementProcessingPriority';
import storeStatements from './storeStatements';

export interface Options {
  readonly config: Config;
  readonly req: Request;
  readonly res: Response;
}

export default async ({ config, req, res }: Options) => {
  const client = await getClient(config, defaultTo(req.header('Authorization'), ''));

  validateStatementProcessingPriority(req.query.priority as string | undefined);

  const priority =
    (req.query.priority as StatementProcessingPriority) || StatementProcessingPriority.MEDIUM;
  const { body, attachments } = await getMultipartStatements(req);

  return storeStatements({ config, client, priority, body, attachments, res });
};
