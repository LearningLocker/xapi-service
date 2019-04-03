import { S3 } from 'aws-sdk';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly azure: {
    readonly account: string;
    readonly accountKey: string;
    readonly containerName: string;
    readonly subFolder: string;
  };
  readonly google: {
    readonly bucketName: string;
    readonly keyFileName: string;
    readonly projectId: string;
    readonly subFolder: string;
  };
  readonly local: {
    readonly storageDir: string;
  };
  readonly s3: {
    readonly awsConfig: S3.ClientConfiguration;
    readonly bucketName: string;
    readonly subFolder: string;
  };
}
