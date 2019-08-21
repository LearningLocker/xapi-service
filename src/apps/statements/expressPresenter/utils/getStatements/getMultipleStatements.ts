import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import { xapiHeaderVersion } from '../../../utils/constants';
import Config from '../../Config';
import checkUnknownParams from '../checkUnknownParams';
import getMoreLink from './getMoreLink';
import getStatementsOptions from './getStatementsOptions';
import getStatementsResultOptions from './getStatementsResultOptions';
import sendMultipartResult from './sendMultipartResult';

export interface Options {
  readonly config: Config;
  readonly res: Response;
  readonly queryParams: any;
  readonly client: ClientModel;
  readonly urlPath: string;
  readonly langs: string[];
}

export default async (opts: Options) => {
  const { queryParams, config, res, client, urlPath, langs } = opts;
  const timestamp = new Date().toISOString();
  const resultOpts = getStatementsResultOptions(queryParams, client);
  const statementsOpts = getStatementsOptions(queryParams);

  checkUnknownParams(queryParams, [
    'format',
    'attachments',
    'agent',
    'verb',
    'activity',
    'registration',
    'related_activities',
    'related_agents',
    'since',
    'until',
    'limit',
    'ascending',
    'cursor',
    'offset',
  ]);

  const results = await config.service.getStatements({
    client,
    langs,
    ...statementsOpts,
    ...resultOpts,
  });
  const moreLink = getMoreLink({ results, resultOpts, statementsOpts, urlPath });
  const jsonResponse = {
    more: moreLink,
    statements: results.statements,
  };
  res.setHeader('X-Experience-API-Consistent-Through', timestamp);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (resultOpts.attachments === true) {
    return sendMultipartResult(jsonResponse, results.attachments, res);
  }

  res.status(200).json(jsonResponse);
};
