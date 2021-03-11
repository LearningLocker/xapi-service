import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';

export default (config: Config) => {
  return catchErrors(
    config,
    async (_req: Request, res: Response): Promise<void> => {
      res.status(StatusCodes.OK).json({
        extensions: { 'X-Experience-API-Version': xapiHeaderVersion },
        version: [xapiHeaderVersion],
      });
    },
  );
};
