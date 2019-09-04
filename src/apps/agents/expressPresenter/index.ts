import { Router } from 'express';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getFullAgent from './getFullAgent';
import getProfiles from './getProfiles';
import postProfile from './postProfile';
import putProfile from './putProfile';

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinHelmet());

  router.delete('/profile', deleteProfile(config));
  router.get('/profile', getProfiles(config));
  router.put('/profile', putProfile(config));
  router.post('/profile', postProfile(config));
  router.get('', getFullAgent(config));

  return router;
};
