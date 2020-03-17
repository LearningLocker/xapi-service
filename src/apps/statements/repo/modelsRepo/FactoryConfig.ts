import MongoFactoryConfig from './utils/mongoModels/FactoryConfig';

export default interface Config {
  readonly facade: string;
  readonly mongo?: MongoFactoryConfig;
}
