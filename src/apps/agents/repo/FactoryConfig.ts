import AuthFactoryConfig from './auth/FactoryConfig';
import ModelsFactoryConfig from './models/FactoryConfig';
import StorageFactoryConfig from './storage/FactoryConfig';

export default interface FactoryConfig {
  readonly auth: AuthFactoryConfig;
  readonly models: ModelsFactoryConfig;
  readonly storage: StorageFactoryConfig;
}
