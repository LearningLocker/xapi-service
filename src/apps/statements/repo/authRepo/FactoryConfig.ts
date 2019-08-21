import FakeFactoryConfig from './utils/fakeAuth/FactoryConfig';
import FetchFactoryConfig from './utils/fetchAuth/FactoryConfig';
import MongoFactoryConfig from './utils/mongoAuth/FactoryConfig';

export default interface Config {
  readonly facade?: string;
  readonly fake?: FakeFactoryConfig;
  readonly fetch?: FetchFactoryConfig;
  readonly mongo?: MongoFactoryConfig;
}
