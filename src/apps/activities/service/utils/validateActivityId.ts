import * as xapi from '@learninglocker/xapi-validation/dist/factory';
import * as rulr from 'rulr';

export default (data: string) => {
  return rulr.maybe(xapi.iri)(data, ['activityId']);
};
