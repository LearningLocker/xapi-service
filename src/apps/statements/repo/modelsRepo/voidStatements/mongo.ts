import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    if (ids.length === 0) { return; }

    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.id': { $in: ids },
      ...matchesClientOption(client),
    };
    const update = { $set: { voided: true } };

    await collection.updateMany(query, update);
  };
};
