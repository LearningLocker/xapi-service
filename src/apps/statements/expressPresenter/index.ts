import { Router } from 'express';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import Config from './Config';
import getAbout from './getAbout';
import getFullActivity from './getFullActivity';
import getStatements from './getStatements';
import postStatements from './postStatements';
import putStatement from './putStatement';

export interface Result {
  readonly aboutRouter: Router;
  readonly fullActivitiesRouter: Router;
  readonly statementsRouter: Router;
}

export default (config: Config): Result => {
  const aboutRouter = Router();
  aboutRouter.use(mixinCors());
  aboutRouter.use(mixinHelmet());
  aboutRouter.get('', getAbout(config));

  const fullActivitiesRouter = Router();
  fullActivitiesRouter.use(mixinCors());
  fullActivitiesRouter.use(mixinHelmet());
  fullActivitiesRouter.get('', getFullActivity(config));

  const statementsRouter = Router();
  statementsRouter.use(mixinCors());
  statementsRouter.use(mixinHelmet());
  statementsRouter.get('', getStatements(config));
  statementsRouter.put('', putStatement(config));
  statementsRouter.post('', postStatements(config));

  return { aboutRouter, fullActivitiesRouter, statementsRouter };
};
