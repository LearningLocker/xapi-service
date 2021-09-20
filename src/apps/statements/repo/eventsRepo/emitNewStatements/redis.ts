import { CHANNEL_NAME, EVENT_NAME } from '../utils/constants';
import { getPrefixWithProcessingPriority } from '../utils/getPrefixWithProcessingPriority';
import FacadeConfig from '../utils/redisEvents/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ statementProperties, priority }) => {
    const client = await config.client();

    const prefixWithPriority = getPrefixWithProcessingPriority(
      config.prefix,
      priority,
      config.isQueuePriorityEnabled,
    );
    const listName = `${prefixWithPriority}:${EVENT_NAME}`;
    const channelName = `${prefixWithPriority}:${CHANNEL_NAME}`;

    await client.rpush(listName, ...statementProperties);
    client.publish(channelName, '');
  };
};
