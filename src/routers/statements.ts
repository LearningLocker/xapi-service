/* tslint:disable:max-file-line-count */
import presenterFacade from 'xapi-statements/dist/expressPresenter';
import repoFacade from 'xapi-statements/dist/repo/facade';
import serviceFacade from 'xapi-statements/dist/service';
import enTranslator from 'xapi-statements/dist/translatorFactory/en';
import config from '../config';
import logger from '../logger';
import tracker from '../tracker';

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
      url: config.mongoModelsRepo.url,
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
      url: config.mongoModelsRepo.url,
    },
  },
  storage: {
    facade: config.repoFactory.storageRepoName,
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
  repo,
  tracker,
});
const presenter = presenterFacade({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: 'xAPI/statements/status',
  customRouteText: 'ok',
  llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  translator: getTranslatorFacade(),
});

export default presenter;
