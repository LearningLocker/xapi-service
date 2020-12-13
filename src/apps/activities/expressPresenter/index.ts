import { Router } from 'express';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import { deleteActivityProfileViaHttp } from '../_functions/deleteActivityProfile/deleteActivityProfileViaHttp';
import { createExpressHandler } from '../_functions/deleteActivityProfile/utils/createExpressHandler';
import Config from './Config';
import getProfiles from './getProfiles';
import postProfile from './postProfile';
import putProfile from './putProfile';

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinHelmet());
  router.delete('', createExpressHandler(deleteActivityProfileViaHttp)(config));
  router.get('', getProfiles(config));
  router.put('', putProfile(config));
  router.post('', postProfile(config));

  return router;
};
