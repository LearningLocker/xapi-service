import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import ClientModel from '../../models/ClientModel';
import Service from '../../serviceFactory/Service';
import createClientModel from './createClientModel';
import storeAwaitedStatements from './storeAwaitedStatements';

export default (service: Service) => {
  return (
    statements: any[],
    attachments: any[] = [],
    client: ClientModel = createClientModel(),
    priority: StatementProcessingPriority = StatementProcessingPriority.MEDIUM,
  ) => {
    return storeAwaitedStatements(service)({
      priority,
      models: statements,
      attachments,
      client,
    });
  };
};
