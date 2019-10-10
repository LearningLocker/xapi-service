import Statement from '../../../models/Statement';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../utils/mongoModels/replaceDotsInStatement';
import Signature from './Signature';

interface Result {
  readonly statement: Statement;
}

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    if (ids.length === 0) {
      return [];
    }
    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.id': { $in: ids },
      ...matchesClientOption(client),
    };

    const project = {
      _id: 0,
      statement: 1,
    };

    const filteredModels = await collection.find(query).project(project).toArray() as Result[];

    const filteredStatements = filteredModels.map((model) => {
      return decodeDotsInStatement(model.statement);
    });
    return filteredStatements;
  };
};
