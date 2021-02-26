import * as S3 from 'aws-sdk/clients/s3';
import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    const debug = Math.random();
    // Gets all of the objects to be deleted.
    console.debug('101', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    try {
      const listObjectsOutput = await config.client.listObjects({
        Bucket: config.bucketName,
        Prefix: config.subFolder,
      }).promise().catch((err) => {
        console.debug('501', debug, err); // tslint:disable-line: no-console - 2021-02-25 flaky CI
        throw err;
      });
      console.debug('102', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
      const objects = listObjectsOutput.Contents !== undefined ? listObjectsOutput.Contents : [];
      const identifierList: S3.ObjectIdentifierList = objects.reduce(
        (identifiers, { Key }) => {
          if (Key !== undefined) {
            return [...identifiers, { Key }];
          }
          return identifiers;
        },
        [] as S3.ObjectIdentifierList,
      );

      // Deletes the objects.
      console.debug('103', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
      if (identifierList.length === 0) {
        console.debug('104a', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
        return;
      }
      await config.client.deleteObjects({
        Bucket: config.bucketName,
        Delete: { Objects: identifierList },
      }).promise();
      console.debug('104b', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    } catch (err) {
      console.debug('502', debug, err); // tslint:disable-line: no-console - 2021-02-25 flaky CI
      throw err;
    }
  };
};
