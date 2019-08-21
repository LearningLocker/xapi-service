import MemoryFactoryConfig from './utils/memoryModels/FactoryConfig';
import MongoFactoryConfig from './utils/mongoModels/FactoryConfig';

export default interface Config {
  readonly facade: string;
  readonly memory?: MemoryFactoryConfig;
  readonly mongo?: MongoFactoryConfig;
}
