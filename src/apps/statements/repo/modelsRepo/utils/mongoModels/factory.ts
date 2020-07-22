import connectToMongoDb from '../../../utils/connectToMongoDb';
import createStatements from '../../createStatements/mongo';
import Facade from '../../Facade';
import getDownRefId from '../../getDownRefId/mongo';
import getFullActivity from '../../getFullActivity/mongo';
import getHashes from '../../getHashes/mongo';
import getStatement from '../../getStatement/mongo';
import getStatements from '../../getStatements/mongo';
import getStatementsByIds from '../../getStatementsByIds/mongo';
import getUpRefIds from '../../getUpRefIds/mongo';
import getUpRefsByIds from '../../getUpRefsByIds/mongo';
import getVoidersByIds from '../../getVoidersByIds/mongo';
import getVoidersByObjectIds from '../../getVoidersByObjectIds/mongo';
import incrementStoreCount from '../../incrementStoreCount/mongo';
import setQueriables from '../../setQueriables/mongo';
import updateFullActivities from '../../updateFullActivities/mongo';
import voidStatements from '../../voidStatements/mongo';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

const defaultMaxTimeMs = 300000; // 5 minutes.

export default (factoryConfig?: FactoryConfig): Facade => {
  const facadeConfig: FacadeConfig = (
    factoryConfig !== undefined
      ? factoryConfig
      : { db: connectToMongoDb(), maxTimeMs: defaultMaxTimeMs }
  );
  return {
    clearRepo: async () => {
      await (await facadeConfig.db()).dropDatabase();
    },
    migrate: async () => Promise.resolve(),
    rollback: async () => Promise.resolve(),
    createStatements: createStatements(facadeConfig),
    getFullActivity: getFullActivity(facadeConfig),
    getHashes: getHashes(facadeConfig),
    getStatement: getStatement(facadeConfig),
    getStatements: getStatements(facadeConfig),
    getVoidersByObjectIds: getVoidersByObjectIds(facadeConfig),
    getVoidersByIds: getVoidersByIds(facadeConfig),
    voidStatements: voidStatements(facadeConfig),
    getDownRefId: getDownRefId(facadeConfig),
    getUpRefIds: getUpRefIds(facadeConfig),
    setQueriables: setQueriables(facadeConfig),
    getStatementsByIds: getStatementsByIds(facadeConfig),
    getUpRefsByIds: getUpRefsByIds(facadeConfig),
    updateFullActivities: updateFullActivities(facadeConfig),
    incrementStoreCount: incrementStoreCount(facadeConfig),
  };
};
