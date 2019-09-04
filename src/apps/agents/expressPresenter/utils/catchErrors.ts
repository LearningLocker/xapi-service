import { Request, Response } from 'express';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import { v4 as uuid } from 'uuid';
import Config from '../Config';
import handleError from '../utils/handleError';

export default (config: Config, handler: CommonHandler) => {
  return (req: Request, res: Response): void => {
    handler(req, res).catch(async (err: any) => {
      const tracker = await config.tracker;
      const errorId = uuid();
      tracker('errorId', errorId);
      config.logger.silly(`${errorId}: xapi-agents request`, {
        headers: req.headers,
        method: req.method,
        query: req.query,
        url: req.originalUrl,
      });
      return handleError({ config, errorId, res, err });
    });
  };
};
