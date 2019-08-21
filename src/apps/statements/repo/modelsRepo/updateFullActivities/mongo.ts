import { Dictionary, mapKeys } from 'lodash';
import { ObjectID } from 'mongodb';
import { FULL_ACTIVITIES_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesFullActivity from '../utils/mongoModels/matchesFullActivity';
import { replaceDotsInExtensions } from '../utils/mongoModels/replaceDotsInStatement';
import Signature from './Signature';

const getPatchUpdate = <T>(patch: Dictionary<T>, parentKeys: string[]) => {
  return mapKeys<T>(patch as any, (_value: T, key: number) => {
    const parentPath = parentKeys.join('.');
    return `${parentPath}.${key}`;
  });
};

export default (config: FacadeConfig): Signature => {
  return async ({ client, updates }) => {
    const collection = (await config.db()).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const lrsId = new ObjectID(client.lrs_id);
    const organisationId = new ObjectID(client.organisation);
    const batch = collection.initializeUnorderedBulkOp();

    updates.forEach((update) => {
      const activityId = update.activityId;
      const extensions = replaceDotsInExtensions(/\./g, '&46;')(update.extensions);
      const mongoQuery = matchesFullActivity({ activityId, lrsId, organisationId });
      const mongoSet = {
        ...getPatchUpdate(update.name, ['name']),
        ...getPatchUpdate(update.description, ['description']),
        ...getPatchUpdate(extensions, ['extensions']),
        ...(update.moreInfo !== undefined ? { moreInfo: update.moreInfo } : {}),
        ...(update.type !== undefined ? { type: update.type } : {}),
      };
      if (Object.keys(mongoSet).length === 0) {
        /* istanbul ignore next */
        return;
      }
      const mongoUpdate = { $set: mongoSet };

      batch.find(mongoQuery).upsert().updateOne(mongoUpdate);
    });

    if (updates.length > 0) {
      await batch.execute();
    }
  };
};
