import * as sourceMapSupport from 'source-map-support'; // tslint:disable-line:ordered-imports
import './tracker'; // tslint:disable-line:no-import-side-effect
sourceMapSupport.install();

import * as express from 'express';
import handleListen from 'jscommons/dist/expressPresenter/utils/handleListen';
import config from './config';
import logger from './logger';
import activitiesRouter from './routers/activities';
import agentsRouter from './routers/agents';
import stateRouter from './routers/state';
import statementsRouter from './routers/statements';

const app = express();

app.use(`${config.express.xAPIPrefix}/xAPI/activities/profile`, activitiesRouter);
app.use(`${config.express.xAPIPrefix}/xAPI/activities/state`, stateRouter);
app.use(`${config.express.xAPIPrefix}/xAPI/agents`, agentsRouter);
app.use(`${config.express.xAPIPrefix}/xAPI/about`, statementsRouter.aboutRouter);
app.use(`${config.express.xAPIPrefix}/xAPI/activities`, statementsRouter.fullActivitiesRouter);
app.use(`${config.express.xAPIPrefix}/xAPI/statements`, statementsRouter.statementsRouter);

app.listen(config.express.port, () => {
  const port80 = 80;
  if (config.express.port === port80) {
    logger.warning('Express port set to 80; this will not work on non-root Node processes');
  }
  logger.info(`Listening on port ${config.express.port}`);
  handleListen(logger);
});
