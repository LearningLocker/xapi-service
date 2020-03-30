/* tslint:disable:max-file-line-count */
import { Router } from 'express';
import AppConfig from './AppConfig';
import presenterFactory from './expressPresenter';
import repoFactory from './repo/factory';
import serviceFactory from './service';
import enTranslator from './translatorFactory/en';

export default (appConfig: AppConfig): Router => {
  const translator = enTranslator;
  const repo = repoFactory({
    auth: {
      factoryName: appConfig.repo.factory.authRepoName,
      mongo: {
        db: appConfig.repo.mongo.db,
      },
      test: {},
    },
    models: {
      factoryName: appConfig.repo.factory.modelsRepoName,
      mongo: {
        db: appConfig.repo.mongo.db,
      },
    },
    storage: {
      factoryName: appConfig.repo.factory.storageRepoName,
      azure: {
        account: appConfig.repo.azure.account,
        accountKey: appConfig.repo.azure.accountKey,
        containerName: appConfig.repo.azure.containerName,
        subFolder: appConfig.repo.storageSubFolder,
      },
      google: {
        bucketName: appConfig.repo.google.bucketName,
        keyFileName: appConfig.repo.google.keyFileName,
        projectId: appConfig.repo.google.projectId,
        subFolder: appConfig.repo.storageSubFolder,
      },
      local: {
        storageDir: `${appConfig.repo.local.storageDir}/${appConfig.repo.storageSubFolder}`,
      },
      s3: {
        awsConfig: appConfig.repo.s3.awsConfig,
        bucketName: appConfig.repo.s3.bucketName,
        subFolder: appConfig.repo.storageSubFolder,
      },
    },
  });
  const service = serviceFactory({ repo });
  const presenter = presenterFactory({
    bodyParserLimit: appConfig.presenter.express.bodyParserLimit,
    customRoute: 'xAPI/activities/profile/status',
    customRouteText: 'ok',
    logger: appConfig.logger,
    morganDirectory: appConfig.presenter.express.morganDirectory,
    service,
    tracker: appConfig.tracker,
    translator,
  });
  return presenter;
};
