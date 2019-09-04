import express from 'express';
import supertest from 'supertest';
import config from '../../../../../config';
import logger from '../../../../../logger';
import tracker from '../../../../../tracker';
import translatorFactory from '../../../translatorFactory';
import { route } from '../../../utils/constants';
import service from '../../../utils/testService';
import presenterFacade from '../../index';

const app = express();
const translator = translatorFactory();
const presenter = presenterFacade({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: 'xAPI/activities/profile/status',
  customRouteText: 'ok',
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  tracker,
  translator,
});

app.use(route, presenter);

export default supertest(app);
