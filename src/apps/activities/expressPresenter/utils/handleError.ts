import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import sendObject from 'jscommons/dist/expressPresenter/utils/sendObject';
import { Warnings } from 'rulr';
import Conflict from '../../errors/Conflict';
import ExpiredClientError from '../../errors/ExpiredClientError';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import InvalidMethod from '../../errors/InvalidMethod';
import JsonSyntaxError from '../../errors/JsonSyntaxError';
import MaxEtags from '../../errors/MaxEtags';
import MissingEtags from '../../errors/MissingEtags';
import NonJsonObject from '../../errors/NonJsonObject';
import UntrustedClientError from '../../errors/UntrustedClientError';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import translateWarning from './translateWarning';

export interface Options extends CommonOptions {
  readonly config: Config;
}

export default ({ config, errorId, res, err }: Options): Response => {
  const { translator } = config;

  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (err instanceof JsonSyntaxError) {
    const code = StatusCodes.BAD_REQUEST;
    const message = translator.jsonSyntaxError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MissingEtags) {
    const code = StatusCodes.BAD_REQUEST;
    const message = translator.missingEtagsError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MaxEtags) {
    const code = StatusCodes.BAD_REQUEST;
    const message = translator.maxEtagsError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Conflict) {
    const code = StatusCodes.CONFLICT;
    const message = translator.conflictError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof IfMatch) {
    const code = StatusCodes.PRECONDITION_FAILED;
    const message = translator.ifMatchError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof IfNoneMatch) {
    const code = StatusCodes.PRECONDITION_FAILED;
    const message = translator.ifNoneMatchError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof NonJsonObject) {
    const code = StatusCodes.BAD_REQUEST;
    const message = translator.nonJsonObjectError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Warnings) {
    const code = 400;
    const warnings = err.warnings;
    const strWarnings = warnings.map((warning) => {
      return translateWarning(translator, warning);
    });
    const obj = { warnings: strWarnings };
    return sendObject({ res, code, errorId, obj });
  }
  if (err instanceof InvalidMethod) {
    const code = StatusCodes.BAD_REQUEST;
    const message = translator.invalidMethodError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof ExpiredClientError) {
    const code = StatusCodes.FORBIDDEN;
    const message = translator.expiredClientError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof UntrustedClientError) {
    const code = StatusCodes.FORBIDDEN;
    const message = translator.untrustedClientError(err);
    return sendMessage({ res, code, errorId, message });
  }
  return commonErrorHandler({ config, errorId, res, err });
};
