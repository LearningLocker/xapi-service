import FacadeConfig from '../utils/googleStorage/FacadeConfig';

export default (config: FacadeConfig) => {
  return async (): Promise<void> => {
    await config.storage.bucket(config.bucketName).deleteFiles({
      prefix: config.subFolder,
    });
  };
};
