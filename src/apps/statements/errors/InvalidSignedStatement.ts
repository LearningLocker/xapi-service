import BaseError from 'jscommons/dist/errors/BaseError';
import Statement from '../models/Statement';

// eslint-disable-next-line functional/no-class
export default class extends BaseError {
  constructor(
    public readonly originalStatement: Statement,
    public readonly decodedStatement: unknown,
  ) {
    super();
  }
}
