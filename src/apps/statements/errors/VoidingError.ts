import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public voidedStatementIds: string[]) {
    super();
  }
}
