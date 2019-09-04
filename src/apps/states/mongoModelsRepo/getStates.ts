/* tslint:disable:deprecation - find isn't really deprecated */
import GetStatesOptions from '../repoFactory/options/GetStatesOptions';
import GetStatesResult from '../repoFactory/results/GetStatesResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getSinceFilter from './utils/getSinceFilter';
import getStatesFilter from './utils/getStatesFilter';

export default (config: Config) => {
  return async (opts: GetStatesOptions): Promise<GetStatesResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);

    const filter = {
      ...getStatesFilter(opts),
      ...getSinceFilter(opts.since),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/AggregationCursor.html#project
    const documents = await collection.find(filter).project({ stateId: 1 }).toArray();

    // Retrieves the stateId from the documents for the result.
    const stateIds = documents.map((document) => {
      return document.stateId;
    });

    return { stateIds };
  };
};
