/* tslint:disable:deprecation - find isn't really deprecated */
import { ObjectID } from 'mongodb';
import GetProfilesOptions from '../repoFactory/options/GetProfilesOptions';
import GetProfilesResult from '../repoFactory/results/GetProfilesResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);

    const sinceFilter = (
      opts.since !== undefined
        ? { updatedAt: { $gt: opts.since } }
        : {}
    );
    const filter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      ...sinceFilter,
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/AggregationCursor.html#project
    const documents = await collection.find(filter).project({ profileId: 1 }).toArray();

    // Retrieves the profileId from the documents for the result.
    const profileIds = documents.map((document) => {
      return document.profileId;
    });

    return { profileIds };
  };
};
