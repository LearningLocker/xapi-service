/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import { get, mapKeys } from 'lodash';
import { parse as parseQueryString } from 'query-string';
import streamToString from 'stream-to-string';
import stringToStream from 'string-to-stream';
import InvalidMethod from '../../errors/InvalidMethod';
import Config from '../Config';
import deleteWithService from './deleteWithService';
import getWithService from './getWithService';
import overwriteStateWithService from './overwriteStateWithService';
import patchStateWithService from './patchStateWithService';

export interface Options {
  readonly config: Config;
  readonly method: string;
  readonly req: Request;
  readonly res: Response;
}

const getQuery = async (stream: NodeJS.ReadableStream) => {
  const body = await streamToString(stream);
  const decodedBody = parseQueryString(body);
  return decodedBody;
};

const getHeaders = (bodyParams: any, req: Request) => {
  const reqHeaders = req.headers;
  const lowerCaseBodyParams = mapKeys(bodyParams, (_value, key: string) => {
    return key.toLowerCase();
  });
  return { ...reqHeaders, ...lowerCaseBodyParams };
};

export default async ({ config, method, req, res }: Options) => {
  switch (method) {
    case 'POST': {
      const query = await getQuery(req);
      const headers = getHeaders(query, req);
      const content = stringToStream(get(query, 'content', '') as string);
      return patchStateWithService({ query, headers, content, config, res });
    }
    case 'GET': {
      const query = await getQuery(req);
      const headers = getHeaders(query, req);
      return getWithService({ config, headers, query, res });
    }
    case 'PUT': {
      const query = await getQuery(req);
      const headers = getHeaders(query, req);
      const content = stringToStream(get(query, 'content', '') as string);
      return overwriteStateWithService({ query, headers, content, config, res });
    }
    case 'DELETE': {
      const query = await getQuery(req);
      const headers = getHeaders(query, req);
      return deleteWithService({ config, headers, query, res });
    }
    default: {
      throw new InvalidMethod(method);
    }
  }
};
