import express from 'express';
import { getFileStorageConfig } from 'src/apps/activities/_functions/deleteActivityProfile/utils/getFileStorageConfig/getFileStorageConfig';
import { getRecordStorageConfig } from 'src/apps/activities/_functions/deleteActivityProfile/utils/getRecordStorageConfig/getRecordStorageConfig';
import { getTrackingConfig } from 'src/apps/activities/_functions/deleteActivityProfile/utils/getTrackingConfig/getTrackingConfig';
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
  fileStorageConfig: getFileStorageConfig(),
  recordStorageConfig: getRecordStorageConfig(),
  trackingConfig: getTrackingConfig(),
});

app.use(route, presenter);

export default supertest(app);
