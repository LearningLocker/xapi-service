import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    await config.storage.bucket(config.bucketName).deleteFiles({
      prefix: config.subFolder,
    });
  };
};
