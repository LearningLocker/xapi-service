import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import overwriteProfileWithService from './utils/overwriteProfileWithService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const headers = req.headers;
    const content = req;
    return overwriteProfileWithService({ config, res, query, headers, content });
  });
};
