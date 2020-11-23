import { Request, Response } from 'express';
import Config from './Config';
import alternateProfileRequest from './utils/alternateProfileRequest';
import catchErrors from './utils/catchErrors';
import patchProfileWithService from './utils/patchProfileWithService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const method = query.method as string | undefined;

    if (method !== undefined) {
      return alternateProfileRequest({ config, method, req, res });
    }

    const headers = req.headers;
    const content = req;
    return patchProfileWithService({ config, res, query, headers, content });
  });
};
