import express from 'express';
import supertest from 'supertest';
import config from '../../../../../config';
import logger from '../../../../../logger';
import tracker from '../../../../../tracker';
import translatorFactory from '../../../translatorFactory';
import { statementsRoute } from '../../../utils/constants';
import service from '../../../utils/testService';
import presenterFacade from '../../index';

const app = express();
const translator = translatorFactory();

const presenter = presenterFacade({
  allowFormBody: config.express.allowFormBody,
  allowUndefinedMethod: config.express.allowUndefinedMethod,
  llClientInfoEndpoint: '',
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: 'xAPI/statements/status',
  customRouteText: 'ok',
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  tracker,
  translator,
});

app.use(statementsRoute, presenter.statementsRouter);

export default supertest(app);
