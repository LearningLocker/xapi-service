import { Router } from 'express';
import activitiesApp from './activities/app';
import agentsApp from './agents/app';
import AppConfig from './AppConfig';
import statementsApp from './statements/app';
import statesApp from './states/app';

export default (appConfig: AppConfig): Router => {
  const router = Router();
  const activitiesRouter = activitiesApp({
    logger: appConfig.logger,
    presenter: {
      express: {
        bodyParserLimit: appConfig.presenter.express.bodyParserLimit,
        morganDirectory: appConfig.presenter.express.morganDirectory,
      },
    },
    repo: {
      factory: appConfig.repo.repoFactory,
      azure: appConfig.repo.azure,
      google: appConfig.repo.google,
      local: appConfig.repo.local,
      mongo: appConfig.repo.mongo,
      s3: appConfig.repo.s3,
      storageSubFolder: appConfig.repo.storageSubFolders.activities,
    },
    tracker: appConfig.tracker,
  });
  const agentsRouter = agentsApp({
    logger: appConfig.logger,
    presenter: {
      express: {
        bodyParserLimit: appConfig.presenter.express.bodyParserLimit,
        morganDirectory: appConfig.presenter.express.morganDirectory,
      },
    },
    repo: {
      factory: appConfig.repo.repoFactory,
      azure: appConfig.repo.azure,
      google: appConfig.repo.google,
      local: appConfig.repo.local,
      mongo: appConfig.repo.mongo,
      s3: appConfig.repo.s3,
      storageSubFolder: appConfig.repo.storageSubFolders.agents,
    },
    tracker: appConfig.tracker,
  });
  const statesRouter = statesApp({
    logger: appConfig.logger,
    presenter: {
      express: {
        bodyParserLimit: appConfig.presenter.express.bodyParserLimit,
        morganDirectory: appConfig.presenter.express.morganDirectory,
      },
    },
    repo: {
      factory: appConfig.repo.repoFactory,
      azure: appConfig.repo.azure,
      google: appConfig.repo.google,
      local: appConfig.repo.local,
      mongo: appConfig.repo.mongo,
      s3: appConfig.repo.s3,
      storageSubFolder: appConfig.repo.storageSubFolders.state,
    },
    tracker: appConfig.tracker,
  });
  const statementsRouter = statementsApp({
    logger: appConfig.logger,
    presenter: {
      express: {
        allowFormBody: appConfig.presenter.express.allowFormBody,
        allowUndefinedMethod: appConfig.presenter.express.allowUndefinedMethod,
        bodyParserLimit: appConfig.presenter.express.bodyParserLimit,
        morganDirectory: appConfig.presenter.express.morganDirectory,
      },
    },
    repo: {
      factory: appConfig.repo.repoFactory,
      azure: appConfig.repo.azure,
      google: appConfig.repo.google,
      local: appConfig.repo.local,
      mongo: appConfig.repo.mongo,
      redis: appConfig.repo.redis,
      s3: appConfig.repo.s3,
      sentinel: appConfig.repo.sentinel,
      storageSubFolder: appConfig.repo.storageSubFolders.statements,
    },
    service: appConfig.service.statements,
    tracker: appConfig.tracker,
  });

  const xAPIPrefix = appConfig.presenter.express.xAPIPrefix;
  router.use(`${xAPIPrefix}/xAPI/activities/profile`, activitiesRouter);
  router.use(`${xAPIPrefix}/xAPI/activities/state`, statesRouter);
  router.use(`${xAPIPrefix}/xAPI/agents`, agentsRouter);
  router.use(`${xAPIPrefix}/xAPI/about`, statementsRouter.aboutRouter);
  router.use(`${xAPIPrefix}/xAPI/activities`, statementsRouter.fullActivitiesRouter);
  router.use(`${xAPIPrefix}/xAPI/statements`, statementsRouter.statementsRouter);
  return router;
  // tslint:disable-next-line:max-file-line-count
};
