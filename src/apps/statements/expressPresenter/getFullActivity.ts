import { Request, Response } from 'express';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getActivityId from './utils/getActivityId';
import getClient from './utils/getClient';
import validateHeaderVersion from './utils/validateHeaderVersion';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const activityId = getActivityId(req.query.activityId as string | undefined);

    validateHeaderVersion(req.header('X-Experience-API-Version'));

    const result = await config.service.getFullActivity({ client, activityId });
    res.status(200);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.json(result);
  });
};
