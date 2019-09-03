import * as xapi from '@learninglocker/xapi-validation/dist/factory';
import * as rulr from 'rulr';

const rule = rulr.maybe(xapi.iri);

export default (data: string) => {
  return rule(data, ['activityId']);
};
