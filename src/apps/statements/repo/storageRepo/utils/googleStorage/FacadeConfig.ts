import { Storage } from '@google-cloud/storage';

interface Config {
  readonly bucketName: string;
  readonly storage: Storage;
  readonly subFolder: string;
}

export default Config;
