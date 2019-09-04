import { createRequiredWarning, Warnings } from 'rulr';
import { jsonContentType } from '../../utils/constants';
import { jsonContentTypePattern } from './contentTypePatterns';

export default (contentTypeHeader: string|undefined) => {
  /* istanbul ignore next - superagent always sends a content type */
  if (contentTypeHeader === undefined) {
    const warnings = [createRequiredWarning(contentTypeHeader, ['headers', 'Content-Type'])];
    throw new Warnings({}, ['headers'], warnings);
  }

  if (jsonContentTypePattern.test(contentTypeHeader)) {
    return jsonContentType;
  }

  return contentTypeHeader;
};
