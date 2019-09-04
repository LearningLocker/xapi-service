import { Storage } from '@google-cloud/storage';

export default interface Config {
  readonly bucketName: string;
  readonly storage: Storage;
  readonly subFolder: string;
}
