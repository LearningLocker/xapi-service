import { parse as parseAcceptedLanguages } from 'accept-language-parser';
import { Response } from 'express';
import QueryIds from '../../../errors/QueryIds';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
import getMultipleStatements from './getMultipleStatements';
import getSingleStatement from './getSingleStatement';

export interface Options {
  readonly config: Config;
  readonly res: Response;
  readonly client: ClientModel;
  readonly queryParams: any;
  readonly urlPath: string;
  readonly acceptedLangs: string;
}

const getAcceptedLanguages = (acceptedLangs: string) => {
  return parseAcceptedLanguages(acceptedLangs).map((acceptedLang) => {
    const ending = acceptedLang.region === undefined ? '' : `-${acceptedLang.region}`;
    return `${acceptedLang.code}${ending}`;
  });
};

export default async ({ config, res, client, queryParams, urlPath, acceptedLangs }: Options) => {
  const statementId = queryParams.statementId;
  const voidedStatementId = queryParams.voidedStatementId;
  const langs = getAcceptedLanguages(acceptedLangs);

  if (statementId !== undefined && voidedStatementId !== undefined) {
    throw new QueryIds();
  }

  if (statementId !== undefined && voidedStatementId === undefined) {
    const id = statementId;
    const voided = false;
    return getSingleStatement({ config, res, queryParams, id, voided, client, langs });
  }

  if (statementId === undefined && voidedStatementId !== undefined) {
    const id = voidedStatementId;
    const voided = true;
    return getSingleStatement({ config, res, queryParams, id, voided, client, langs });
  }

  return getMultipleStatements({ config, res, queryParams, client, urlPath, langs });
};
