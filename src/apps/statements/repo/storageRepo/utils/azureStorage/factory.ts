import {
  ContainerURL, ServiceURL, SharedKeyCredential, StorageURL,
} from '@azure/storage-blob';
import clearRepo from '../../clearRepo/azure';
import createAttachments from '../../createAttachments/azure';
import Facade from '../../Facade';
import getAttachment from '../../getAttachment/azure';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  if (
    factoryConfig.account === undefined ||
    factoryConfig.accountKey === undefined ||
    factoryConfig.containerName === undefined ||
    factoryConfig.subFolder === undefined
  ) {
    throw new Error('Missing config');
  }

  const credential = new SharedKeyCredential(factoryConfig.account, factoryConfig.accountKey);
  const pipeline = StorageURL.newPipeline(credential);
  const serviceURL = new ServiceURL(
    `https://${factoryConfig.account}.blob.core.windows.net`, pipeline,
  );
  const containerUrl = ContainerURL.fromServiceURL(serviceURL, factoryConfig.containerName);

  const facadeConfig: FacadeConfig = {
    containerUrl,
    subFolder: factoryConfig.subFolder,
  };
  return {
    clearRepo: clearRepo(facadeConfig),
    createAttachments: createAttachments(facadeConfig),
    getAttachment: getAttachment(facadeConfig),
    migrate: async () => Promise.resolve(),
    rollback: async () => Promise.resolve(),
  };
};
