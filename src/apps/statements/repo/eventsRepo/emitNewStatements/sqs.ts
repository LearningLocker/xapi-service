import {
  GetQueueUrlCommand,
  SQSClient,
  SendMessageBatchCommand,
  SendMessageBatchRequestEntry,
} from '@aws-sdk/client-sqs';
import { v4 } from 'uuid';
import { getPrefixWithProcessingPriority } from '../utils/getPrefixWithProcessingPriority';
import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';
import FacadeConfig from '../utils/sqsEvents/FacadeConfig';
import { STATEMENT_QUEUE } from '../utils/constants';
import Signature from './Signature';

const MAX_BATCH_SIZE = 10;

let queueUrl: string | undefined;

const publishMessages = async (sqsClient: SQSClient, statementProperties: string[]) => {
  const statementPropertiesBatchRequest = statementProperties.map(
    (statementProperty): SendMessageBatchRequestEntry => ({
      Id: v4(),
      MessageBody: statementProperty,
    }),
  );

  for (let index = 0; index < statementPropertiesBatchRequest.length; index += MAX_BATCH_SIZE) {
    await sqsClient.send(
      new SendMessageBatchCommand({
        QueueUrl: queueUrl,
        Entries: statementPropertiesBatchRequest.slice(index, index + MAX_BATCH_SIZE),
      }),
    );
  }
};

const getQueueUrl = async (
  sqsClient: SQSClient,
  prefix: string,
  priority: StatementProcessingPriority,
  isQueuePriorityEnabled: boolean,
) => {
  if (queueUrl) {
    return queueUrl;
  }

  const prefixWithPriority = getPrefixWithProcessingPriority(
    prefix,
    priority,
    isQueuePriorityEnabled,
  );

  const getQueueUrlCommand = new GetQueueUrlCommand({
    QueueName: `${prefixWithPriority}_${STATEMENT_QUEUE}`,
  });

  const commandResult = await sqsClient.send(getQueueUrlCommand);

  queueUrl = commandResult.QueueUrl;

  return queueUrl;
};

export default (config: FacadeConfig): Signature => {
  return async ({ statementProperties, priority }) => {
    const sqsClient = await config.client();

    await getQueueUrl(sqsClient, config.prefix, priority, config.isQueuePriorityEnabled);
    await publishMessages(sqsClient, statementProperties);
  };
};
