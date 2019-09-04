import commonTranslator from 'jscommons/dist/translatorFactory/en';
import stringPath from 'jscommons/dist/translatorFactory/utils/stringPath';
import Translator from './Translator';

const translator: Translator = {
  conflictError: () => (
    'Get the profile to retrieve the Etag, then set the If-Match header to the Etag'
  ),
  expiredClientError: () => `Your organisation has expired`,
  ifMatchError: () => (
    'IfMatch does not match Etag because a modification has been made since it was retrieved'
  ),
  ifNoneMatchError: () => (
    'IfNoneMatch was used to detect that the resource was already present'
  ),
  invalidMethodError: (err) => (
    `Method (${err.method}) is invalid for alternate request syntax`
  ),
  jsonSyntaxError: (err) => {
    const path = stringPath(err.path);
    return `Expected valid JSON in ${path}`;
  },
  maxEtagsError: () => (
    'IfMatch and IfNoneMatch cannot be used at the same time'
  ),
  missingEtagsError: () => (
    'IfMatch and IfNoneMatch header are missing'
  ),
  nonJsonObjectError: () => (
    'Expected a JSON object to be provided and stored (if it exists)'
  ),
  untrustedClientError: () => 'Your client has been disabled',
  xapiTypeWarning: (warning) => {
    const path = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Expected ${warning.typeName} in ${path}. Received '${dataString}'`;
  },
  ...commonTranslator,
};

export default translator;
