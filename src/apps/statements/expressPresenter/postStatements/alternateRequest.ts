import { Request, Response } from 'express';
import { defaultTo, get } from 'lodash';
import { parse as parseQueryString } from 'query-string';
import streamToString from 'stream-to-string';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import parseJson from '../../utils/parseJson';
import Config from '../Config';
import checkUnknownParams from '../utils/checkUnknownParams';
import { jsonContentTypePattern } from '../utils/contentTypePatterns';
import getClient from '../utils/getClient';
import getStatements from '../utils/getStatements';
import getUrlPath from '../utils/getUrlPath';
import storeStatement from '../utils/storeStatement';
import validateVersionHeader from '../utils/validateHeaderVersion';
import { validateStatementProcessingPriority } from '../utils/validateStatementProcessingPriority';
import storeStatements from './storeStatements';

export interface Options {
  readonly config: Config;
  readonly method?: string;
  readonly req: Request;
  readonly res: Response;
}

const checkContentType = (bodyParams: any) => {
  const contentType = get(bodyParams, 'Content-Type', 'application/json');

  if (!jsonContentTypePattern.test(contentType)) {
    throw new InvalidContentType(contentType);
  }
};

const getBodyContent = (bodyParams: any) => {
  const unparsedBody = get(bodyParams, 'content', '');

  return parseJson(unparsedBody, ['body', 'content']);
};

const getHeader = (bodyParams: any, req: Request, name: string): string => {
  return get(bodyParams, name, defaultTo(req.header(name), ''));
};

const getBodyParams = async (stream: NodeJS.ReadableStream) => {
  const body = await streamToString(stream);

  return parseQueryString(body);
};

export default async ({ config, method, req, res }: Options) => {
  checkUnknownParams(req.query, ['method']);

  validateStatementProcessingPriority(req.query.priority as string | undefined);
  const priority =
    (req.query.priority as StatementProcessingPriority) || StatementProcessingPriority.MEDIUM;

  if (method === 'POST' || (method === undefined && config.allowUndefinedMethod)) {
    const bodyParams = await getBodyParams(req);

    checkContentType(bodyParams);

    const auth = getHeader(bodyParams, req, 'Authorization');
    const client = await getClient(config, auth);
    const version = getHeader(bodyParams, req, 'X-Experience-API-Version');

    validateVersionHeader(version);

    const body = getBodyContent(bodyParams);

    return storeStatements({ config, client, priority, body, attachments: [], res });
  }

  if (method === 'GET') {
    const bodyParams = await getBodyParams(req);
    const urlPath = getUrlPath(req);
    const auth = getHeader(bodyParams, req, 'Authorization');
    const client = await getClient(config, auth);
    const version = getHeader(bodyParams, req, 'X-Experience-API-Version');

    validateVersionHeader(version);

    const acceptedLangs = defaultTo<string>(req.header('Accept-Language'), '');
    const queryParams = bodyParams;

    return getStatements({ config, res, client, queryParams, urlPath, acceptedLangs });
  }

  if (method === 'PUT') {
    const bodyParams = await getBodyParams(req);

    checkContentType(bodyParams);

    const auth = getHeader(bodyParams, req, 'Authorization');
    const client = await getClient(config, auth);
    const version = getHeader(bodyParams, req, 'X-Experience-API-Version');

    validateVersionHeader(version);

    const body = getBodyContent(bodyParams);
    const statementId = bodyParams.statementId as string | undefined;

    return storeStatement({ config, client, body, priority, attachments: [], statementId, res });
  }

  throw new InvalidMethod(method);
};
