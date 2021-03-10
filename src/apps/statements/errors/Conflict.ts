import BaseError from 'jscommons/dist/errors/BaseError';

// eslint-disable-next-line functional/no-class
export default class extends BaseError {
  constructor(public readonly statementId: string) {
    super();
  }
}
