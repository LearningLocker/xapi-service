// tslint:disable:max-file-line-count
import { Response } from 'express';
import { BAD_REQUEST, CONFLICT, FORBIDDEN, PRECONDITION_FAILED } from 'http-status-codes';
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
  const { logger, translator } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: xapi-activities handled - ${msg}`, meta);
  };

  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (err instanceof JsonSyntaxError) {
    const code = BAD_REQUEST;
    const message = translator.jsonSyntaxError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MissingEtags) {
    const code = BAD_REQUEST;
    const message = translator.missingEtagsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MaxEtags) {
    const code = BAD_REQUEST;
    const message = translator.maxEtagsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Conflict) {
    const code = CONFLICT;
    const message = translator.conflictError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof IfMatch) {
    const code = PRECONDITION_FAILED;
    const message = translator.ifMatchError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof IfNoneMatch) {
    const code = PRECONDITION_FAILED;
    const message = translator.ifNoneMatchError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof NonJsonObject) {
    const code = BAD_REQUEST;
    const message = translator.nonJsonObjectError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Warnings) {
    const code = 400;
    const warnings = err.warnings;
    const strWarnings = warnings.map((warning) => {
      return translateWarning(translator, warning);
    });
    const obj = { warnings: strWarnings };
    logError('Validation warnings', strWarnings);
    return sendObject({ res, code, errorId, obj });
  }
  if (err instanceof InvalidMethod) {
    const code = BAD_REQUEST;
    const message = translator.invalidMethodError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof ExpiredClientError) {
    const code = FORBIDDEN;
    const message = translator.expiredClientError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof UntrustedClientError) {
    const code = FORBIDDEN;
    const message = translator.untrustedClientError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  return commonErrorHandler({ config, errorId, res, err });
};
