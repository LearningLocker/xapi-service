import NoModel from 'jscommons/dist/errors/NoModel';
import StoredStatementModel from '../../../models/StoredStatementModel';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../utils/mongoModels/replaceDotsInStatement';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, id, voided }) => {
    const db = await config.db();
    const collection = db.collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.id': id,
      ...matchesClientOption(client, true),
      ...(voided === undefined ? {} : { voided }),
    };

    const filteredModel = ((await collection.findOne(query)) as unknown) as StoredStatementModel;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    return {
      ...filteredModel,
      statement: decodeDotsInStatement(filteredModel.statement),
    };
  };
};
