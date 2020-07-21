import { Dictionary, mapKeys } from 'lodash';
import { ObjectID } from 'mongodb';
import { FULL_ACTIVITIES_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesFullActivity from '../utils/mongoModels/matchesFullActivity';
import { replaceDotsInExtensions } from '../utils/mongoModels/replaceDotsInStatement';
import Signature from './Signature';

const getPatchUpdate = <T>(patch: Dictionary<T>, parentKeys: string[]) =>
  mapKeys<T>(
    patch as any,
    (_value: T, key: number) => `${parentKeys.join('.')}.${key}`,
  );

export default (config: FacadeConfig): Signature =>
  async ({ fullActivities }) => {
    const collection = (await config.db()).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const batch = collection.initializeUnorderedBulkOp();

    fullActivities.forEach((fullActivity) => {
      const activityId = fullActivity.activityId;
      const lrsId = new ObjectID(fullActivity.lrsId);
      const organisationId = new ObjectID(fullActivity.organisationId);
      const mongoQuery = matchesFullActivity({ activityId, lrsId, organisationId });
      const extensions = fullActivity.extensions !== undefined
        ? replaceDotsInExtensions(/\./g, '&46;')(fullActivity.extensions)
        : undefined;
      const mongoSet = {
        ...(
          fullActivity.name !== undefined
            ? getPatchUpdate(fullActivity.name, ['name'])
            : {}
        ),
        ...(
          fullActivity.description !== undefined
            ? getPatchUpdate(fullActivity.description, ['description'])
            : {}
        ),
        ...(
          extensions
            ? getPatchUpdate(extensions, ['extensions'])
            : undefined
        ),
        ...(
          fullActivity.contextActivities !== undefined
            ? { contextActivities: fullActivity.contextActivities }
            : {}
        ),
        ...(
          fullActivity.moreInfo !== undefined
            ? { moreInfo: fullActivity.moreInfo }
            : {}
        ),
        ...(
          fullActivity.type !== undefined
            ? { type: fullActivity.type }
            : {}
        ),
      };

      if (Object.keys(mongoSet).length === 0) {
        /* istanbul ignore next */
        return;
      }

      batch.find(mongoQuery).upsert().updateOne({ $set: mongoSet });
    });

    if (fullActivities.length > 0) {
      await batch.execute();
    }
  };
