/* tslint:disable:max-file-line-count */
import { S3 } from 'aws-sdk';
import { MongoClient } from 'mongodb';
import expressPresenter from 'xapi-statements/dist/expressPresenter';
import localStorageRepo from 'xapi-statements/dist/localStorageRepo';
import memoryModelsRepo from 'xapi-statements/dist/memoryModelsRepo';
import mongoModelsRepo from 'xapi-statements/dist/mongoModelsRepo';
import s3StorageRepo from 'xapi-statements/dist/s3StorageRepo';
import service from 'xapi-statements/dist/service';
import enTranslator from 'xapi-statements/dist/translatorFactory/en';
import config from '../config';
import logger from '../logger';

const getModelsRepo = () => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(config.mongoModelsRepo.url),
      });
    default: case 'memory':
      return memoryModelsRepo({
        state: { statements: [] },
      });
  }
};

const getStorageRepo = () => {
  switch (config.repoFactory.storageRepoName) {
    case 's3':
      return s3StorageRepo({
        bucketName: config.s3StorageRepo.bucketName,
        client: new S3(config.s3StorageRepo.awsConfig),
        subFolder: config.storageSubFolders.statements,
      });
    default:
    case 'local': {
      const statementsStorageDir = (
        `${config.localStorageRepo.storageDir}/${config.storageSubFolders.statements}`
      );
      return localStorageRepo({
        storageDir: statementsStorageDir,
      });
    }
  }
};

const getRepoFacade = () => {
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await modelsRepo.clearRepo();
      await storageRepo.clearRepo();
    },
    migrate: async () => {
      await modelsRepo.migrate();
      await storageRepo.migrate();
    },
    rollback: async () => {
      await modelsRepo.rollback();
      await storageRepo.rollback();
    },
  };
};

const getTranslatorFacade = () => {
  switch (config.lang) {
    case 'en':
    default:
      return enTranslator;
  }
};

const repoFacade = getRepoFacade();
const serviceFacade = service({
  awaitUpdates: config.statementsService.awaitUpdates,
  enableAttachmentCreation: config.statementsService.enableAttachmentCreation,
  enableAttachmentValidation: config.statementsService.enableAttachmentValidation,
  enableConflictChecks: config.statementsService.enableConflictChecks,
  enableReferencing: config.statementsService.enableReferencing,
  enableStatementCreation: config.statementsService.enableStatementCreation,
  enableVoiding: config.statementsService.enableVoiding,
  enableVoidingChecks: config.statementsService.enableVoidingChecks,
  repo: repoFacade,
});
const expressFacade = expressPresenter({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: 'xAPI/statements/status',
  customRouteText: 'ok',
  llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
  logger,
  morganDirectory: config.express.morganDirectory,
  service: serviceFacade,
  translator: getTranslatorFacade(),
});

export default expressFacade;
