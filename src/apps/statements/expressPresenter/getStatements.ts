import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getStatements from './utils/getStatements';
import getUrlPath from './utils/getUrlPath';
import validateVersionHeader from './utils/validateHeaderVersion';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, defaultTo(req.header('Authorization'), ''));

    validateVersionHeader(req.header('X-Experience-API-Version'));

    const queryParams = req.query;
    const urlPath = getUrlPath(req);
    const acceptedLangs = defaultTo<string>(req.header('Accept-Language'), '');

    return getStatements({
      config,
      res,
      client,
      queryParams,
      urlPath,
      acceptedLangs,
    });
  });
};
