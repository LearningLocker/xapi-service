import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import validateVersionHeader from './utils/validateVersionHeader';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    validateVersionHeader(req.header('X-Experience-API-Version'));
    const agent = getAgent(req.query.agent as string | undefined);
    const result = await config.service.getFullAgent({ client, agent });
    res.status(OK);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.json(result);
  });
};
