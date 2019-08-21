import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public statementId: string, public algorithm: string) {
    super();
  }
}
