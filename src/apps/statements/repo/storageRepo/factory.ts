import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import azureFactory from './utils/azureStorage/factory';
import googleFactory from './utils/googleStorage/factory';
import localFactory from './utils/localStorage/factory';
import s3Factory from './utils/s3Storage/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 's3':
      return s3Factory(config.s3);
    case 'google':
      return googleFactory(config.google);
    case 'azure':
      return azureFactory(config.azure);
    case 'local': default:
      return localFactory(config.local);
  }
};
