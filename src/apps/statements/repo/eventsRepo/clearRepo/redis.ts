import FacadeConfig from '../utils/redisEvents/FacadeConfig';

const EVENT_NAME = 'statement.new';

export default (config: FacadeConfig) => {
  return async (): Promise<void> => {
    const client = (await config.client());
    const listName = `${config.prefix}:${EVENT_NAME}`;
    await client.del(listName);
  };
};
