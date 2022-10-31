import { ObjectId } from 'mongodb';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import { encodeDotsInStatement } from '../utils/mongoModels/replaceDotsInStatement';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async (opts) => {
    if (opts.models.length === 0) {
      return [];
    }

    const documents = opts.models.map((model) => {
      const statement = encodeDotsInStatement(model.statement);
      return {
        ...model,
        organisation: new ObjectId(model.organisation),
        lrs_id: new ObjectId(model.lrs_id),
        client: new ObjectId(model.client),
        statement,
      };
    });

    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);
    await collection.insertMany(documents);
    return opts.models;
  };
};
