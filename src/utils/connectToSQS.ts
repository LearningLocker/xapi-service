import { SQSClient } from '@aws-sdk/client-sqs';
import { once } from 'lodash';
import config from '../config';
import logger from '../logger';

export default once((): (() => Promise<SQSClient>) => {
  return once(async () => {
    logger.info('Creating SQS connection');

    return new SQSClient({
      ...(
        config.aws.defaultRegion
          ? { region: config.aws.defaultRegion }
          : null
      ),
      ...(
        config.aws.accessKeyId && config.aws.secretAccessKey
          ? {
            credentials: {
              accessKeyId: config.aws.accessKeyId as string,
              secretAccessKey: config.aws.secretAccessKey as string,
            }
          }
          : null
      ),
    });
  });
});
