import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import streamToString from 'stream-to-string';
import { StatementProcessingPriority } from '../enums/statementProcessingPriority.enum';
import InvalidContentType from '../errors/InvalidContentType';
import AttachmentModel from '../models/AttachmentModel';
import parseJson from '../utils/parseJson';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import { jsonContentTypePattern, multipartContentTypePattern } from './utils/contentTypePatterns';
import getClient from './utils/getClient';
import getMultipartStatements from './utils/getMultipartStatements';
import storeStatement from './utils/storeStatement';
import validateVersionHeader from './utils/validateHeaderVersion';
import { validateStatementProcessingPriority } from './utils/validateStatementProcessingPriority';

export default (config: Config) => {
  return catchErrors(
    config,
    async (req: Request, res: Response): Promise<void> => {
      validateStatementProcessingPriority(req.query.priority as string | undefined);
      validateVersionHeader(req.header('X-Experience-API-Version'));

      const contentType = defaultTo(req.header('Content-Type'), '');
      const client = await getClient(config, defaultTo(req.header('Authorization'), ''));
      const priority =
        (req.query.priority as StatementProcessingPriority) || StatementProcessingPriority.MEDIUM;
      const statementId = req.query.statementId as string;

      if (multipartContentTypePattern.test(contentType)) {
        const { body, attachments } = await getMultipartStatements(req);
        return storeStatement({ config, priority, body, attachments, client, statementId, res });
      }

      if (jsonContentTypePattern.test(contentType)) {
        const body = parseJson(await streamToString(req), ['body']);
        const attachments: AttachmentModel[] = [];
        return storeStatement({ config, priority, body, attachments, client, statementId, res });
      }

      throw new InvalidContentType(contentType);
    },
  );
};
