import FacadeConfig from '../utils/redisEvents/FacadeConfig';
import Signature from './Signature';

const EVENT_NAME = 'statement.new';
const CHANNEL_NAME = 'statement.notify';

export default (config: FacadeConfig): Signature => {
  return async ({ statementProperties }) => {
    const client = await config.client();
    const listName = `${config.prefix}:${EVENT_NAME}`;
    const channelName = `${config.prefix}:${CHANNEL_NAME}`;
    await client.rpush(listName, ...statementProperties);
    client.publish(channelName, '');
  };
};
