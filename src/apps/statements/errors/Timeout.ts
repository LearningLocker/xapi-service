import BaseError from 'jscommons/dist/errors/BaseError';

// tslint:disable-next-line:no-class
export default class extends BaseError {
  // istanbul ignore next - Couldn't test without an unacceptable test duration.
  constructor(public readonly timeoutMs: number) {
    super();
  }
}
