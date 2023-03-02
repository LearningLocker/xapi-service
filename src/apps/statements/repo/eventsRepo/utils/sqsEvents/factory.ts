import { defaultTo } from 'lodash';
import emitNewStatements from '../../emitNewStatements/sqs';
import Facade from '../../Facade';
import connectToSQS from "../../../../../../utils/connectToSQS";
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    client: defaultTo(factoryConfig.client, connectToSQS()),
    prefix: defaultTo(factoryConfig.prefix, 'xapistatements'),
    isQueuePriorityEnabled: defaultTo(factoryConfig.isQueuePriorityEnabled, false),
  };
  return {
    emitNewStatements: emitNewStatements(facadeConfig),
    clearRepo: async () => {
      // Do nothing.
    },
    migrate: async () => {
      // Do nothing.
    },
    rollback: async () => {
      // Do nothing.
    },
  };
};
