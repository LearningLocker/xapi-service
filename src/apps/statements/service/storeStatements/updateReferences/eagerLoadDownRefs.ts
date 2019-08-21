import { Dictionary, includes } from 'lodash';
import ClientModel from '../../../models/ClientModel';
import Statement from '../../../models/Statement';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import Config from '../../Config';
import groupStatementsById from './groupStatementsById';

const getGroupedDownRefs = async (
  config: Config,
  models: UnstoredStatementModel[],
  client: ClientModel,
): Promise<Dictionary<Statement>> => {
  const allIds: string[] = models.map((model) => {
    return model.statement.id;
  });
  const targetIds: string[] = models.reduce((results, model) => {
    if (
      model.statement.object.objectType === 'StatementRef' &&
      includes(allIds, model.statement.object.id) // No need to load models that we already have.
    ) {
      return [...results, model.statement.object.id];
    }
    return results;
  }, [] as string[]);
  const targetStatements = await config.repo.getStatementsByIds({ ids: targetIds, client });
  const groupedStatements = groupStatementsById(targetStatements);
  return groupedStatements;
};

const getGroupedModels = (models: UnstoredStatementModel[]) => {
  const statements = models.map((model) => {
    return model.statement;
  });
  const groupedStatements = groupStatementsById(statements);
  return groupedStatements;
};

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  client: ClientModel,
): Promise<Dictionary<Statement>> => {
  const groupedDownRefs = await getGroupedDownRefs(config, models, client);
  const groupedModels = getGroupedModels(models);
  return {
    ...groupedDownRefs,
    ...groupedModels,
  };
};
