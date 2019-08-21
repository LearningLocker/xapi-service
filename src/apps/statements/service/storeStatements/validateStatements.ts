import { statement as validateStatement } from '@learninglocker/xapi-validation/dist/factory';
import * as rulr from 'rulr';

const validateStatements = rulr.maybe(rulr.restrictToCollection(() => validateStatement));

export default (models: any[]) => {
  validateStatements(models, ['statements']);
};
