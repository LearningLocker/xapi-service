import { SQSClient } from '@aws-sdk/client-sqs';

export default interface FactoryConfig {
  readonly client?: () => Promise<SQSClient>;
  readonly prefix?: string;
  readonly isQueuePriorityEnabled?: boolean;
}
