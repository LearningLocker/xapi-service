import S3 from 'aws-sdk/clients/s3';
import Tracker from 'jscommons/dist/tracker/Tracker';
import { Db } from 'mongodb';
import { LoggerInstance } from 'winston';

export default interface AppConfig {
  readonly logger: LoggerInstance;
  readonly tracker: Promise<Tracker>;
  readonly presenter: {
    readonly express: {
      readonly bodyParserLimit: string;
      readonly morganDirectory: string;
    };
  };
  readonly repo: {
    readonly storageSubFolder: string;
    readonly azure: {
      readonly account: string;
      readonly accountKey: string;
      readonly containerName: string;
    };
    readonly factory: {
      readonly authRepoName: string;
      readonly modelsRepoName: string;
      readonly storageRepoName: string;
    };
    readonly google: {
      readonly bucketName: string;
      readonly keyFileName: string;
      readonly projectId: string;
    };
    readonly local: {
      readonly storageDir: string;
    };
    readonly s3: {
      readonly awsConfig: S3.ClientConfiguration;
      readonly bucketName: string;
    };
    readonly mongo: {
      readonly db: () => Promise<Db>;
    };
  };
}
