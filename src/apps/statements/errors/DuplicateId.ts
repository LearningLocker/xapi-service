import BaseError from 'jscommons/dist/errors/BaseError';

// tslint:disable-next-line:no-class
export default class extends BaseError {
  constructor(public statementId: string) {
    super();
  }
}
