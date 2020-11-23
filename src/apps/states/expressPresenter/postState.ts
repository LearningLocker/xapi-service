import { Request, Response } from 'express';
import Config from './Config';
import alternateStateRequest from './utils/alternateStateRequest';
import catchErrors from './utils/catchErrors';
import patchStateWithService from './utils/patchStateWithService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    const method = query.method as string | undefined;

    if (method !== undefined) {
      return alternateStateRequest({ config, method, req, res });
    }

    const headers = req.headers;
    const content = req;
    return patchStateWithService({ config, res, query, headers, content });
  });
};
