import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as express from 'express';
import config from './config';
import logger from './logger';
import activitiesRouter from './routers/activities';
import agentsRouter from './routers/agents';
import stateRouter from './routers/state';
import statementsRouter from './routers/statements';

const app = express();

const handleExit = (event: string) => {
  return (error?: any) => {
    if (error !== undefined) {
      logger.error(error.stack);
    }
    logger.info(event);
    process.exit();
  };
};

app.use(statementsRouter);
app.use(agentsRouter);
app.use(activitiesRouter);
app.use(stateRouter);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send !== undefined) {
    logger.info('Process ready');
    process.send('ready');
  }
  process.on('exit', handleExit('exit'));
  process.on('SIGINT', handleExit('SIGINT'));
  process.on('SIGTERM', handleExit('SIGTERM'));
  process.on('uncaughtException', handleExit('uncaughtException'));
});
