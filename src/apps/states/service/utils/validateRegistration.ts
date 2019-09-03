import * as xapi from '@learninglocker/xapi-validation/dist/factory';
import * as rulr from 'rulr';

const rule = rulr.maybe(rulr.optional(xapi.uuid));

export default (data?: string) => {
  return rule(data, ['registration']);
};
