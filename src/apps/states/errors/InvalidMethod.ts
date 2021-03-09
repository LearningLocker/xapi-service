/* eslint-disable functional/no-class */
import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public readonly method: string) {
    super();
  }
}
