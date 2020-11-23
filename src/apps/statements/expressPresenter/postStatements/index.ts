import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import { parse as parseQueryString } from 'query-string';
import streamToString from 'stream-to-string';
import InvalidContentType from '../../errors/InvalidContentType';
import parseJson from '../../utils/parseJson';
import Config from '../Config';
import catchErrors from '../utils/catchErrors';
import {
  alternateContentTypePattern,
  jsonContentTypePattern,
  multipartContentTypePattern,
} from '../utils/contentTypePatterns';
import getClient from '../utils/getClient';
import validateVersionHeader from '../utils/validateHeaderVersion';
import alternateRequest from './alternateRequest';
import storeStatements from './storeStatements';
import storeWithAttachments from './storeWithAttachments';

const parseJsonBody = async (config: Config, req: Request) => {
  const body = await streamToString(req);
  if (config.allowFormBody && body.slice(0, 8) === 'content=') {
    const formData = parseQueryString(body);
    return parseJson(formData.content as string, ['body', 'content']);
  }
  return parseJson(body, ['body']);
};

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {

    const method = req.query.method as string | undefined;
    const contentType = defaultTo(req.header('Content-Type'), '');

    if (method === undefined && multipartContentTypePattern.test(contentType)) {
      return storeWithAttachments({ config, req, res });
    }

    if (method === undefined && jsonContentTypePattern.test(contentType)) {
      const client = await getClient(config, defaultTo(req.header('Authorization'), ''));
      validateVersionHeader(req.header('X-Experience-API-Version'));

      const body = await parseJsonBody(config, req);
      const attachments: any[] = [];
      return storeStatements({ config, client, body, attachments, res });
    }

    if (method !== undefined || alternateContentTypePattern.test(contentType)) {
      return alternateRequest({ config, method, req, res });
    }

    throw new InvalidContentType(contentType);
  });
};
