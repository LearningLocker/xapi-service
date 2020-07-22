import { S3 } from 'aws-sdk';
import { Redis } from 'ioredis';
import Tracker from 'jscommons/dist/tracker/Tracker';
import { Db } from 'mongodb';
import { LoggerInstance } from 'winston';

export default interface AppConfig {
  readonly repo: {
    readonly repoFactory: {
      readonly authRepoName: string;
      readonly eventsRepoName: string;
      readonly modelsRepoName: string;
      readonly storageRepoName: string;
    };
    readonly storageSubFolders: {
      readonly activities: string;
      readonly agents: string;
      readonly state: string;
      readonly statements: string;
    };
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
    };
    readonly mongo: {
      readonly db: () => Promise<Db>;
      readonly maxTimeMs: number;
    };
    readonly redis: {
      readonly prefix: string;
      readonly client: () => Promise<Redis>;
    };
    readonly sentinel: {
      readonly prefix: string;
      readonly client: () => Promise<Redis>;
    };
  };
  readonly service: {
    readonly statements: {
      readonly awaitUpdates: boolean;
      readonly enableActorLowerCasing: boolean;
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
  };
  readonly presenter: {
    readonly express: {
      readonly allowFormBody: boolean;
      readonly allowUndefinedMethod: boolean;
      readonly bodyParserLimit: string;
      readonly morganDirectory: string;
      readonly port: number;
      readonly xAPIPrefix: string;
    };
  };
  readonly tracker: Promise<Tracker>;
  readonly logger: LoggerInstance;
}
