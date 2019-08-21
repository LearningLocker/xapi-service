import { defaultTo } from 'lodash';
import connectToRedis from '../../../utils/connectToRedis';
import clearRepo from '../../clearRepo/redis';
import emitNewStatements from '../../emitNewStatements/redis';
import Facade from '../../Facade';
import FacadeConfig from '../redisEvents/FacadeConfig';
import FactoryConfig from '../redisEvents/FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    client: defaultTo(factoryConfig.client, connectToRedis()),
    prefix: defaultTo(factoryConfig.prefix, 'xapistatements'),
  };
  return {
    emitNewStatements: emitNewStatements(facadeConfig),
    clearRepo: clearRepo(facadeConfig),
    migrate: async () => {
      // Do nothing.
    },
    rollback: async () => {
      // Do nothing.
    },
  };
};
