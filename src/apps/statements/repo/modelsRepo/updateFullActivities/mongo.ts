import { Dictionary, mapKeys } from 'lodash';
import { isEmpty } from 'lodash';
import { ObjectID, UnorderedBulkOperation } from 'mongodb';
import FullActivityDatabase from '../../../models/FullActivityDatabase';
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

const createMongoAddToSet = (fullActivity: FullActivityDatabase) => (
  {
    ...(fullActivity.context?.contextActivities?.parent !== undefined
        ? {
          'context.contextActivities.parent': {
            $each: fullActivity.context.contextActivities.parent,
          },
        }
        : {}
    ),
    ...(fullActivity.context?.contextActivities?.category !== undefined
        ? {
          'context.contextActivities.category': {
            $each: fullActivity.context.contextActivities.category,
          },
        }
        : {}
    ),
    ...(fullActivity.context?.contextActivities?.other !== undefined
        ? {
          'context.contextActivities.other': {
            $each: fullActivity.context.contextActivities.other,
          },
        }
        : {}
    ),
    ...(fullActivity.context?.contextActivities?.grouping !== undefined
        ? {
          'context.contextActivities.grouping': {
            $each: fullActivity.context.contextActivities.grouping,
          },
        }
        : {}
    ),
  }
);

const createMongoSet = (fullActivity: FullActivityDatabase) => {
  const extensions = replaceDotsInExtensions(/\./g, '&46;')(fullActivity.extensions);

  return {
    ...getPatchUpdate(fullActivity.name, ['name']),
    ...getPatchUpdate(fullActivity.description, ['description']),
    ...getPatchUpdate(extensions, ['extensions']),
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
};

const createMongoQuery = (fullActivity: FullActivityDatabase) => {
  const activityId = fullActivity.activityId;
  const lrsId = new ObjectID(fullActivity.lrsId);
  const organisationId = new ObjectID(fullActivity.organisationId);

  return matchesFullActivity({ activityId, lrsId, organisationId });
};

const creatBatchQuery = (batch: UnorderedBulkOperation) => (fullActivity: FullActivityDatabase) => {
  const mongoQuery = createMongoQuery(fullActivity);
  // tslint:disable:no-inferred-empty-object-type
  const mongoSet = createMongoSet(fullActivity);
  const mongoAddToSet = createMongoAddToSet(fullActivity);
  // tslint:enable:no-inferred-empty-object-type

  batch.find(mongoQuery).upsert().updateOne({
    ...(!isEmpty(mongoSet) ? { $set: mongoSet } : {}),
    ...(!isEmpty(mongoAddToSet) ? { $addToSet: mongoAddToSet } : {}),
  });
};

export default (config: FacadeConfig): Signature =>
  async ({ fullActivities }) => {
    if (fullActivities.length < 1) {
      return;
    }

    const collection = (await config.db()).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const batch = collection.initializeUnorderedBulkOp();

    fullActivities.forEach(creatBatchQuery(batch));
    await batch.execute();
    // tslint:disable-next-line:max-file-line-count
  };
