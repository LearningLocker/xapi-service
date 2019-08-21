import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import getClient from './getClient';
import getFullActivity from './getFullActivity';
import getStatement from './getStatement';
import getStatements from './getStatements';
import storeStatements from './storeStatements';

export default (config: Config): Service => {
  return {
    getClient: getClient(config),
    storeStatements: storeStatements(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getFullActivity: getFullActivity(config),
    ...commonService(config),
  };
};
