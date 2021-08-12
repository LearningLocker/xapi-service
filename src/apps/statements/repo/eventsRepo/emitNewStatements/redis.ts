import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';
import FacadeConfig from '../utils/redisEvents/FacadeConfig';
import Signature from './Signature';

const EVENT_NAME = 'statement.new';
const CHANNEL_NAME = 'statement.notify';

const getPrefixWithProcessingPriority = (
  originalPrefix: string,
  priority: StatementProcessingPriority,
): string => {
  switch (priority) {
    case StatementProcessingPriority.LOW:
      return `${originalPrefix}_${StatementProcessingPriority.LOW}`;
    case StatementProcessingPriority.MEDIUM:
    default:
      return originalPrefix;
  }
};

export default (config: FacadeConfig): Signature => {
  return async ({ statementProperties, priority }) => {
    const client = await config.client();

    const prefixWithPriority = getPrefixWithProcessingPriority(config.prefix, priority);
    const listName = `${prefixWithPriority}:${EVENT_NAME}`;
    const channelName = `${prefixWithPriority}:${CHANNEL_NAME}`;

    await client.rpush(listName, ...statementProperties);
    client.publish(channelName, '');
  };
};
