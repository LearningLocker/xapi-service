import FakeFactoryConfig from './utils/fakeAuth/FactoryConfig';
import MongoFactoryConfig from './utils/mongoAuth/FactoryConfig';

export default interface Config {
  readonly facade?: string;
  readonly fake?: FakeFactoryConfig;
  readonly mongo?: MongoFactoryConfig;
}
