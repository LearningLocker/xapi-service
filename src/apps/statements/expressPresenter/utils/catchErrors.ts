import { Request, Response } from 'express';
import BaseError from 'jscommons/dist/errors/BaseError';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import { v4 as uuid } from 'uuid';
import Config from '../Config';
import handleError from '../utils/handleError';

export default (config: Config, handler: CommonHandler) => {
  return (req: Request, res: Response): void => {
    handler(req, res).catch(async (err: any | Error | BaseError) => {
      const tracker = await config.tracker;
      const errorId = uuid();
      tracker('errorId', errorId);
      config.logger.silly(`${errorId}: xapi-statements request`, {
        headers: req.headers,
        query: req.query,
        method: req.method,
        url: req.originalUrl,
      });
      return handleError({ config, errorId, res, err });
    });
  };
};
