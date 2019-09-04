import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getWithService from './utils/getWithService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const headers = req.headers;
    return getWithService({ config, res, query, headers });
  });
};
