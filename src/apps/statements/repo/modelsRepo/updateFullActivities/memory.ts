import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesFullActivity from '../utils/memoryModels/matchesFullActivity';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, updates }) => {
    const lrsId = client.lrs_id;
    const organisationId = client.organisation;

    updates.forEach((update) => {
      const activityId = update.activityId;
      const existingModels = config.state.fullActivities;
      const matchingModels = existingModels.filter((model) => {
        return matchesFullActivity({ activityId, lrsId, model, organisationId });
      });

      // Creates a new full activity when the activity doesn't exist.
      if (matchingModels.length === 0) {
        config.state.fullActivities = [
          ...existingModels,
          {
            activityId,
            lrsId,
            organisationId,
            name: update.name,
            description: update.description,
            extensions: update.extensions,
            moreInfo: update.moreInfo,
            type: update.type,
          },
        ];
        return;
      }

      // Updates the full activity when it already exists.
      config.state.fullActivities = existingModels.map((model) => {
        if (!matchesFullActivity({ activityId, lrsId, model, organisationId })) {
          return model;
        }
        return {
          ...model,
          name: {
            ...model.name,
            ...update.name,
          },
          description: {
            ...model.description,
            ...update.description,
          },
          extensions: {
            ...model.extensions,
            ...update.extensions,
          },
          moreInfo: update.moreInfo,
          type: update.type,
        };
      });
    });
  };
};
