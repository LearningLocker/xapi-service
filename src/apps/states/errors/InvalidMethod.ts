/* tslint:disable:no-class */
import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public method: string) {
    super();
  }
}
