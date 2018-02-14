import * as sourceMapSupport from 'source-map-support'; // tslint:disable-line:ordered-imports
import './tracker'; // tslint:disable-line:no-import-side-effect
sourceMapSupport.install();

import * as express from 'express';
import handleListen from 'jscommons/dist/expressPresenter/utils/handleListen';
import app from './apps/app';
import config from './config';
import logger from './logger';
import tracker from './tracker';
import connectToMongoDb from './utils/connectToMongoDb';

const expressApp = express();

expressApp.use(app({
  logger,
  presenter: {
    express: config.express,
  },
  repo: {
    google: config.googleStorageRepo,
    local: config.localStorageRepo,
    mongo: { db: connectToMongoDb() },
    redis: config.redis,
    repoFactory: config.repoFactory,
    s3: config.s3StorageRepo,
    storageSubFolders: config.storageSubFolders,
  },
  service: {
    statements: config.statementsService,
  },
  tracker,
}));

expressApp.listen(config.express.port, () => {
  const port80 = 80;
  if (config.express.port === port80) {
    logger.warning('Express port set to 80; this will not work on non-root Node processes');
  }
  logger.info(`Listening on port ${config.express.port}`);
  handleListen(logger);
});
