import BaseError from 'jscommons/dist/errors/BaseError';

/* istanbul ignore next */
export default class extends BaseError {
  constructor(public objectType: string) {
    super();
  }
}
