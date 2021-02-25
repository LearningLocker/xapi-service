import * as S3 from 'aws-sdk/clients/s3';
import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    const debug = Math.random();
    // Gets all of the objects to be deleted.
    console.debug('101', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    const listObjectsOutput = await config.client.listObjects({
      Bucket: config.bucketName,
      Prefix: config.subFolder,
    }).promise().catch((err) => {
      console.debug('501', debug, err); // tslint:disable-line: no-console - 2021-02-25 flaky client
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
    if (identifierList.length === 0) {
      return;
    }
    console.debug('103', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await config.client.deleteObjects({
      Bucket: config.bucketName,
      Delete: { Objects: identifierList },
    }).promise();
    console.debug('104', debug); // tslint:disable-line: no-console - 2021-02-25 flaky CI
  };
};
