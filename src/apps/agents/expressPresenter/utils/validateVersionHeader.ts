import { version as validateVersion } from '@learninglocker/xapi-validation/dist/factory';
import * as rulr from 'rulr';

const versionHeaderValidator = rulr.maybe(rulr.required(validateVersion));
export default (headerVal?: string) => {
  versionHeaderValidator(headerVal, ['header', 'X-Experience-API-Version']);
};
