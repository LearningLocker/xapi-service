/* tslint:disable:max-file-line-count */
import presenterFacade from '@learninglocker/xapi-statements/dist/expressPresenter';
import repoFacade from '@learninglocker/xapi-statements/dist/repo/facade';
import serviceFacade from '@learninglocker/xapi-statements/dist/service';
import enTranslator from '@learninglocker/xapi-statements/dist/translatorFactory/en';
import config from '../config';
import logger from '../logger';
import tracker from '../tracker';
import connectToMongoDb from '../utils/connectToMongoDb';

const getTranslatorFacade = () => {
  switch (config.lang) {
    case 'en':
    default:
      return enTranslator;
  }
};

const repo = repoFacade({
  auth: {
    facade: config.repoFactory.authRepoName,
    fake: {},
    fetch: {
      llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
    },
    mongo: {
      db: connectToMongoDb(),
    },
  },
  events: {
    facade: config.repoFactory.eventsRepoName,
    redis: {
      prefix: config.redis.prefix,
      url: config.redis.url,
    },
  },
  models: {
    facade: config.repoFactory.modelsRepoName,
    memory: {
      state: {
        fullActivities: [],
        statements: [],
      },
    },
    mongo: {
      db: connectToMongoDb(),
    },
  },
  storage: {
    facade: config.repoFactory.storageRepoName,
    google: {
      bucketName: config.googleStorageRepo.bucketName,
      keyFileName: config.googleStorageRepo.keyFileName,
      projectId: config.googleStorageRepo.projectId,
      subFolder: config.googleStorageRepo.subFolder,
    },
    local: {
      storageDir: `${config.localStorageRepo.storageDir}/${config.storageSubFolders.statements}`,
    },
    s3: {
      awsConfig: config.s3StorageRepo.awsConfig,
      bucketName: config.s3StorageRepo.bucketName,
      subFolder: config.storageSubFolders.statements,
    },
  },
});
const service = serviceFacade({
  awaitUpdates: config.statementsService.awaitUpdates,
  enableActivityUpdates: config.statementsService.enableActivityUpdates,
  enableAttachmentCreation: config.statementsService.enableAttachmentCreation,
  enableAttachmentValidation: config.statementsService.enableAttachmentValidation,
  enableConflictChecks: config.statementsService.enableConflictChecks,
  enableNullRemoval: config.statementsService.enableNullRemoval,
  enableReferencing: config.statementsService.enableReferencing,
  enableStatementCreation: config.statementsService.enableStatementCreation,
  enableVoiding: config.statementsService.enableVoiding,
  enableVoidingChecks: config.statementsService.enableVoidingChecks,
  logger,
  repo,
  tracker,
});
const presenter = presenterFacade({
  allowFormBody: config.express.allowFormBody,
  allowUndefinedMethod: config.express.allowUndefinedMethod,
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: 'xAPI/statements/status',
  customRouteText: 'ok',
  llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  tracker,
  translator: getTranslatorFacade(),
});

export default presenter;
