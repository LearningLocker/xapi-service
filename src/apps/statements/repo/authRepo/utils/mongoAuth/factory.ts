import connectToMongoDb from '../../../utils/connectToMongoDb';
import Facade from '../../Facade';
import getClient from '../../getClient/mongo';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig?: FactoryConfig): Facade => {
  const facadeConfig: FacadeConfig = (
    factoryConfig !== undefined
      ? factoryConfig
      : { db: connectToMongoDb() }
  );
  return {
    getClient: getClient(facadeConfig),
  };
};
