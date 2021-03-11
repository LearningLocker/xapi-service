import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import tracker from './tracker'; // eslint-disable-line import/order
import express from 'express';
import handleListen from 'jscommons/dist/expressPresenter/utils/handleListen';
import app from './apps/app';
import config from './config';
import logger from './logger';
import connectToMongoDb from './utils/connectToMongoDb';
import connectToRedis from './utils/connectToRedis';

const expressApp = express();

expressApp.use(
  app({
    logger,
    presenter: {
      express: config.express,
    },
    repo: {
      azure: config.azureStorageRepo,
      google: config.googleStorageRepo,
      local: config.localStorageRepo,
      mongo: {
        db: connectToMongoDb(),
        maxTimeMs: config.defaultTimeout,
      },
      redis: {
        client: connectToRedis(),
        prefix: config.redis.prefix,
      },
      repoFactory: config.repoFactory,
      s3: config.s3StorageRepo,
      storageSubFolders: config.storageSubFolders,
    },
    service: {
      statements: config.statementsService,
    },
    tracker,
  }),
);

expressApp.listen(config.express.port, () => {
  const port80 = 80;
  if (config.express.port === port80) {
    logger.warn('Express port set to 80; this will not work on non-root Node processes');
  }
  logger.info(`Listening on port ${config.express.port}`);
  handleListen(logger);
});
