import BaseError from 'jscommons/dist/errors/BaseError';
import Statement from '../models/Statement';

// tslint:disable-next-line:no-class
export default class extends BaseError {
  constructor(public originalStatement: Statement, public decodedStatement: unknown) {
    super();
  }
}
