import Storage from '@google-cloud/storage';
import { defaultTo } from 'lodash';
import clearRepo from '../../clearRepo/google';
import createAttachments from '../../createAttachments/google';
import Facade from '../../Facade';
import getAttachment from '../../getAttachment/google';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    bucketName: defaultTo(factoryConfig.bucketName, 'xapi-server'),
    storage: Storage({
      projectId: defaultTo(factoryConfig.projectId, 'll'),
      keyFilename: defaultTo(factoryConfig.keyFileName, 'google.keyfile.json'),
    }),
    subFolder: defaultTo(factoryConfig.subFolder, 'storage').replace(/^\//, ''),
  };
  return {
    clearRepo: clearRepo(facadeConfig),
    createAttachments: createAttachments(facadeConfig),
    getAttachment: getAttachment(facadeConfig),
    migrate: async () => Promise.resolve(),
    rollback: async () => Promise.resolve(),
  };
};
