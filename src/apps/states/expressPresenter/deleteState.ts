import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import deleteWithService from './utils/deleteWithService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const headers = req.headers;
    return deleteWithService({ config, res, query, headers });
  });
};
