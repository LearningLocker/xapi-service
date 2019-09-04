import { Router } from 'express';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getProfiles from './getProfiles';
import postProfile from './postProfile';
import putProfile from './putProfile';

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinHelmet());

  router.delete('', deleteProfile(config));
  router.get('', getProfiles(config));
  router.put('', putProfile(config));
  router.post('', postProfile(config));

  return router;
};
