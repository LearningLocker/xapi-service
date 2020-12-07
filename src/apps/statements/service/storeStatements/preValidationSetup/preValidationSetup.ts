import * as modr from '../../../utils/modr';
import Config from '../../Config';
import { lowerCaseActors } from './lowerCaseActors';
import removeNulls from './removeNulls';
import { wrapContextActivitiesInArrays } from './wrapContextActivitiesInArrays';

export default (config: Config, models: any[]): any[] => {
  return models.map((model) => {
    const setup = modr.composeModifiers([
      removeNulls(config),
      lowerCaseActors(config),
      wrapContextActivitiesInArrays,
    ]);

    return setup(model);
  });
};
