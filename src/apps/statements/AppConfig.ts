import * as S3 from 'aws-sdk/clients/s3';
import Tracker from 'jscommons/dist/tracker/Tracker';
import { Db } from 'mongodb';
import { LoggerInstance } from 'winston';

export default interface AppConfig {
  readonly logger: LoggerInstance;
  readonly tracker: Promise<Tracker>;
  readonly presenter: {
    readonly express: {
      readonly allowFormBody: boolean;
      readonly allowUndefinedMethod: boolean;
      readonly bodyParserLimit: string;
      readonly morganDirectory: string;
    };
  };
  readonly service: {
    readonly awaitUpdates: boolean;
    readonly enableActivityUpdates: boolean;
    readonly enableAttachmentCreation: boolean;
    readonly enableAttachmentValidation: boolean;
    readonly enableConflictChecks: boolean;
    readonly enableNullRemoval: boolean;
    readonly enableReferencing: boolean;
    readonly enableStatementCreation: boolean;
    readonly enableVoiding: boolean;
    readonly enableVoidingChecks: boolean;
  };
  readonly repo: {
    readonly storageSubFolder: string;
    readonly factory: {
      readonly authRepoName: string;
      readonly eventsRepoName: string;
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
    readonly redis: {
      readonly prefix: string;
      readonly url: string;
    };
  };
}
