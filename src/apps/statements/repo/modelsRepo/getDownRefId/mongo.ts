import NoModel from 'jscommons/dist/errors/NoModel';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels//constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import Signature from './Signature';

interface Result {
  readonly statement: {
    readonly object: {
      readonly id: string;
    };
  };
}

export default (config: FacadeConfig): Signature => {
  return async ({ client, id }) => {
    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.id': id,
      ...matchesClientOption(client),
    };
    const queryOptions = {
      fields: {
        _id: 0,
        'statement.object.id': 1,
      },
    };
    const result = await collection.findOne<Result>(query, queryOptions);

    if (result === null) {
      throw new NoModel('Statement');
    }

    return result.statement.object.id;
  };
};
