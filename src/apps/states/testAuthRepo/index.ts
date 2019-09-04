import AuthRepo from '../repoFactory/AuthRepo';
import Config from './Config';
import getClient from './getClient';

export default (config: Config): AuthRepo => {
  return {
    getClient: getClient(config),
  };
};
