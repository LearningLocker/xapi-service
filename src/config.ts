import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
import { defaultTo } from 'lodash';
import * as os from 'os';

const DEFAULT_EXPRESS_PORT = 8081;
const DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.

const storageDir = `${process.cwd()}/storage`;
const expressPort = getNumberOption(process.env.EXPRESS_PORT, DEFAULT_EXPRESS_PORT);
const demoAuth = `http://localhost:${expressPort}/auth`;
const accessLogsDir = `${storageDir}/accessLogs`;

export default {
  defaultTimeout: getNumberOption(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  express: {
    bodyParserLimit: getStringOption(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    morganDirectory: getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: expressPort,
    xAPIPrefix: getStringOption(process.env.XAPI_PREFIX, '/data'),
  },

  fetchAuthRepo: {
    llClientInfoEndpoint: getStringOption(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
  },
  lang: getStringOption(process.env.LANG, 'en'),
  localStorageRepo: {
    storageDir: getStringOption(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
  },
  mongoModelsRepo: {
    url: getStringOption(process.env.MONGO_URL, 'mongodb://localhost:27017/learninglocker_v2'),
  },
  redis: {
    prefix: getStringOption(process.env.REDIS_PREFIX, 'LEARNINGLOCKER'),
    url: getStringOption(process.env.REDIS_URL, 'redis://127.0.0.1:6379/0'),
  },
  repoFactory: {
    authRepoName: getStringOption(process.env.AUTH_REPO, 'mongo'),
    eventsRepoName: getStringOption(process.env.EVENTS_REPO, 'redis'),
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'mongo'),
    storageRepoName: getStringOption(process.env.STORAGE_REPO, 'local'),
  },
  s3StorageRepo: {
    awsConfig: {
      accessKeyId: getStringOption(process.env.FS_S3_ACCESS_KEY_ID),
      apiVersion: '2006-03-01',
      region: getStringOption(process.env.FS_S3_REGION),
      secretAccessKey: getStringOption(process.env.FS_S3_SECRET_ACCESS_KEY),
      signatureVersion: 'v4',
      sslEnabled: true,
    } as S3.ClientConfiguration,
    bucketName: getStringOption(process.env.FS_S3_BUCKET, 'xapi-service'),
  },
  statementsService: {
    awaitUpdates: getBooleanOption(defaultTo<any>(
      process.env.SERVICE_AWAIT_UPDATES,
      process.env.SERVICE_AWAIT_UODATES,
    ), false),
    enableActivityUpdates: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_ACTIVITIES),
    enableAttachmentCreation: getBooleanOption(process.env.STATEMENTS_SERVICE_CREATE_ATTACHMENTS),
    enableAttachmentValidation: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_ATTACHMENTS),
    enableConflictChecks: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_CONFLICTS),
    enableReferencing: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_REFS),
    enableStatementCreation: getBooleanOption(process.env.STATEMENTS_SERVICE_CREATE_STATEMENTS),
    enableVoiding: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_VOIDS),
    enableVoidingChecks: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_VOIDS),
  },
  storageSubFolders: {
    activities: getStringOption(process.env.SUB_FOLDER_ACTIVITIES, '/activities'),
    agents: getStringOption(process.env.SUB_FOLDER_AGENTS, '/agents'),
    state: getStringOption(process.env.SUB_FOLDER_STATE, '/state'),
    statements: getStringOption(process.env.SUB_FOLDER_STATEMENTS, '/statements'),
  },
  winston: {
    cloudWatch: {
      awsConfig: {
        accessKeyId: getStringOption(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID),
        region: getStringOption(process.env.WINSTON_CLOUDWATCH_REGION),
        secretAccessKey: getStringOption(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY),
      },
      enabled: getBooleanOption(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
      level: getStringOption(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-state'),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
    },
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
