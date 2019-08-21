import ClientModel from '../../models/ClientModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';

export default async (
  config: Config,
  statements: UnstoredStatementModel[],
  voidedObjectIds: string[],
  client: ClientModel,
): Promise<void> => {
  /* istanbul ignore next */
  if (!config.enableVoiding) { return; }

  const statementIds = statements.map((model) => {
    return model.statement.id;
  });
  const voidersForStatementIds = await config.repo.getVoidersByObjectIds({
    ids: statementIds,
    client,
  });
  const idsToBeVoided: string[] = [
    ...voidedObjectIds,
    ...voidersForStatementIds,
  ];
  await config.repo.voidStatements({
    ids: idsToBeVoided,
    client,
  });
};
