import { Request, Response } from 'express';
import { defaultTo, get } from 'lodash';
import { parse as parseQueryString } from 'query-string';
import streamToString from 'stream-to-string';
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
  const body = parseJson(unparsedBody, ['body', 'content']);
  return body;
};

const getHeader = (bodyParams: any, req: Request, name: string): string => {
  return get(bodyParams, name, defaultTo(req.header(name), ''));
};

const getBodyParams = async (stream: NodeJS.ReadableStream) => {
  const body = await streamToString(stream);
  const decodedBody = parseQueryString(body);
  return decodedBody;
};

export default async ({ config, method, req, res }: Options) => {
  checkUnknownParams(req.query, ['method']);

  if (method === 'POST' || (method === undefined && config.allowUndefinedMethod)) {
    const bodyParams = await getBodyParams(req);
    checkContentType(bodyParams);
    const auth = getHeader(bodyParams, req, 'Authorization');
    const client = await getClient(config, auth);
    const version = getHeader(bodyParams, req, 'X-Experience-API-Version');
    validateVersionHeader(version);
    const body = getBodyContent(bodyParams);
    return storeStatements({ config, client, body, attachments: [], res });
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
    const queryParams = bodyParams;
    return storeStatement({ config, client, body, attachments: [], queryParams, res });
  }

  throw new InvalidMethod(method);
};
