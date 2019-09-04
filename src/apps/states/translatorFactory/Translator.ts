import TypeWarning from '@learninglocker/xapi-validation/dist/warnings/TypeWarning';
import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import ExpiredClientError from '../errors/ExpiredClientError';
import InvalidMethod from '../errors/InvalidMethod';
import JsonSyntaxError from '../errors/JsonSyntaxError';
import NonJsonObject from '../errors/NonJsonObject';
import UntrustedClientError from '../errors/UntrustedClientError';

interface Translator extends CommonTranslator {
  readonly expiredClientError: (err: ExpiredClientError) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly jsonSyntaxError: (err: JsonSyntaxError) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly untrustedClientError: (err: UntrustedClientError) => string;
  readonly xapiTypeWarning: (err: TypeWarning) => string;
}

export default Translator;
