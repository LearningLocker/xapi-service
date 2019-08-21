import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesFullActivity from '../utils/memoryModels/matchesFullActivity';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ activityId, client }) => {
    const lrsId = client.lrs_id;
    const organisationId = client.organisation;

    const filteredModels = config.state.fullActivities.filter((model) => {
      return matchesFullActivity({ activityId, lrsId, model, organisationId });
    });

    if (filteredModels.length === 0) {
      return {
        id: activityId,
        name: {},
        description: {},
        extensions: {},
      };
    }

    const fullActivity = filteredModels[0];
    return {
      id: fullActivity.activityId,
      name: fullActivity.name,
      description: fullActivity.description,
      extensions: fullActivity.extensions,
      ...(fullActivity.moreInfo !== undefined ? { moreInfo: fullActivity.moreInfo } : {}),
      ...(fullActivity.type !== undefined ? { type: fullActivity.type } : {}),
    };
  };
};
