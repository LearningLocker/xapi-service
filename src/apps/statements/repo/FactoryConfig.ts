import AuthFactoryConfig from './authRepo/FactoryConfig';
import EventsFactoryConfig from './eventsRepo/FactoryConfig';
import ModelsFactoryConfig from './modelsRepo/FactoryConfig';
import StorageFactoryConfig from './storageRepo/FactoryConfig';

export default interface Config {
  readonly auth: AuthFactoryConfig;
  readonly events: EventsFactoryConfig;
  readonly models: ModelsFactoryConfig;
  readonly storage: StorageFactoryConfig;
}
