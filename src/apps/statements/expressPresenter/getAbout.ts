import { Request, Response } from 'express';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';

export default (config: Config) => {
  return catchErrors(config, async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      extensions: {'X-Experience-API-Version': xapiHeaderVersion},
      version: [xapiHeaderVersion],
    });
  });
};
