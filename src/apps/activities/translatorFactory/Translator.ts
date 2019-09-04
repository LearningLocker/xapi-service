import TypeWarning from '@learninglocker/xapi-validation/dist/warnings/TypeWarning';
import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import Conflict from '../errors/Conflict';
import ExpiredClientError from '../errors/ExpiredClientError';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import InvalidMethod from '../errors/InvalidMethod';
import JsonSyntaxError from '../errors/JsonSyntaxError';
import MaxEtags from '../errors/MaxEtags';
import MissingEtags from '../errors/MissingEtags';
import NonJsonObject from '../errors/NonJsonObject';
import UntrustedClientError from '../errors/UntrustedClientError';

interface Translator extends CommonTranslator {
  readonly conflictError: (err: Conflict) => string;
  readonly expiredClientError: (err: ExpiredClientError) => string;
  readonly ifMatchError: (err: IfMatch) => string;
  readonly ifNoneMatchError: (err: IfNoneMatch) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly jsonSyntaxError: (err: JsonSyntaxError) => string;
  readonly maxEtagsError: (err: MaxEtags) => string;
  readonly missingEtagsError: (err: MissingEtags) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly untrustedClientError: (err: UntrustedClientError) => string;
  readonly xapiTypeWarning: (err: TypeWarning) => string;
}

export default Translator;
