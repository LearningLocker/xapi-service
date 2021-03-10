import BaseError from 'jscommons/dist/errors/BaseError';

// eslint-disable-next-line functional/no-class
export default class extends BaseError {
  /* istanbul ignore next - Couldn't test without an unacceptable test duration. */
  constructor(public readonly timeoutMs: number) {
    super();
  }
}
