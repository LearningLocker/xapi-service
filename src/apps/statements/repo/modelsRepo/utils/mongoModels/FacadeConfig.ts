import { Db } from 'mongodb';

interface Config {
  readonly db: () => Promise<Db>;
  readonly maxTimeMs: number;
}

export default Config;
