import { Response } from 'express';
import { BAD_REQUEST, FORBIDDEN } from 'http-status-codes';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import sendObject from 'jscommons/dist/expressPresenter/utils/sendObject';
import { Warnings } from 'rulr';
import ExpiredClientError from '../../errors/ExpiredClientError';
import InvalidMethod from '../../errors/InvalidMethod';
import JsonSyntaxError from '../../errors/JsonSyntaxError';
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
    logger.error(`${errorId}: xapi-state handled - ${msg}`, meta);
  };

  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (err instanceof JsonSyntaxError) {
    const code = BAD_REQUEST;
    const message = translator.jsonSyntaxError(err);
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
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof UntrustedClientError) {
    const code = FORBIDDEN;
    const message = translator.untrustedClientError(err);
    return sendMessage({ res, code, errorId, message });
  }
  return commonErrorHandler({ config, errorId, res, err });
};
