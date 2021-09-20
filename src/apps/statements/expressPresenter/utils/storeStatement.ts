import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import MissingStatementId from '../../errors/MissingStatementId';
import UnequalStatementId from '../../errors/UnequalStatementId';
import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';

export interface Options {
  readonly config: Config;
  readonly priority: StatementProcessingPriority;
  readonly body: any;
  readonly attachments: AttachmentModel[];
  readonly client: ClientModel;
  readonly statementId?: string;
  readonly res: Response;
}

export default async ({
  config,
  priority,
  body,
  attachments,
  client,
  statementId,
  res,
}: Options) => {
  if (statementId === undefined) {
    throw new MissingStatementId();
  }

  if (body.id !== undefined && body.id !== statementId) {
    throw new UnequalStatementId(statementId);
  }

  const models = [
    {
      ...body,
      id: statementId, // Ensures the id is set to the given id.
    },
  ];

  await config.service.storeStatements({ priority, models, attachments, client });

  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.status(StatusCodes.NO_CONTENT);

  res.send();
};
