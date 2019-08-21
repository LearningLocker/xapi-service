import { union } from 'lodash';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({
    id,
    client,
    agents,
    relatedAgents,
    verbs,
    activities,
    relatedActivities,
    registrations,
  }) => {
    config.state.statements = config.state.statements.map((model) => {
      if (model.statement.id === id && matchesClientOption(model, client)) {
        return {
          ...model,
          agents: union(agents, model.agents),
          relatedAgents: union(relatedAgents, model.relatedAgents),
          verbs: union(verbs, model.verbs),
          activities: union(activities, model.activities),
          relatedActivities: union(relatedActivities, model.relatedActivities),
          registrations: union(registrations, model.registrations),
        };
      }
      return model;
    });
  };
};
