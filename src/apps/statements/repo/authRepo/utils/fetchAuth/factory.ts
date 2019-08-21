import { defaultTo } from 'lodash';
import Facade from '../../Facade';
import getClient from '../../getClient/fetch';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    llClientInfoEndpoint: defaultTo(factoryConfig.llClientInfoEndpoint, `http://localhost/auth`),
  };
  return {
    getClient: getClient(facadeConfig),
  };
};
