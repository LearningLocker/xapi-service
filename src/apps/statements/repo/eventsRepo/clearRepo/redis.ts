import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';
import { EVENT_NAME } from '../utils/constants';
import { getPrefixWithProcessingPriority } from '../utils/getPrefixWithProcessingPriority';
import FacadeConfig from '../utils/redisEvents/FacadeConfig';

export default (config: FacadeConfig) => {
  return async (): Promise<void> => {
    const client = await config.client();

    await Promise.all(
      Object.values(StatementProcessingPriority).map((statementProcessingPriority) => {
        const listName = `${getPrefixWithProcessingPriority(
          config.prefix,
          statementProcessingPriority,
          config.isQueuePriorityEnabled,
        )}:${EVENT_NAME}`;

        return client.del(listName);
      }),
    );
  };
};
