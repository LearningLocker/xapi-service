import { Response } from 'express';
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import sendObject from 'jscommons/dist/expressPresenter/utils/sendObject';
import ChangedStatementRef from '../../errors/ChangedStatementRef';
import Conflict from '../../errors/Conflict';
import DataBeforeFirstBoundary from '../../errors/DataBeforeFirstBoundary';
import DataBeyondFinalBoundary from '../../errors/DataBeyondFinalBoundary';
import DuplicateId from '../../errors/DuplicateId';
import ExpiredClientError from '../../errors/ExpiredClientError';
import ExtraAttachments from '../../errors/ExtraAttachments';
import InvalidBoundary from '../../errors/InvalidBoundary';
import InvalidContentTransferEncoding from '../../errors/InvalidContentTransferEncoding';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidJws from '../../errors/InvalidJws';
import InvalidMethod from '../../errors/InvalidMethod';
import InvalidSignatureAlgorithm from '../../errors/InvalidSignatureAlgorithm';
import InvalidSignedStatement from '../../errors/InvalidSignedStatement';
import InvalidVoidType from '../../errors/InvalidVoidType';
import InvalidX5CChain from '../../errors/InvalidX5CChain';
import InvalidX5CType from '../../errors/InvalidX5CType';
import JsonSyntaxError from '../../errors/JsonSyntaxError';
import MissingAttachments from '../../errors/MissingAttachments';
import MissingLoadedId from '../../errors/MissingLoadedId';
import MissingStatementId from '../../errors/MissingStatementId';
import NoStatements from '../../errors/NoStatements';
import QueryIds from '../../errors/QueryIds';
import Timeout from '../../errors/Timeout';
import UnequalStatementId from '../../errors/UnequalStatementId';
import UnknownParams from '../../errors/UnknownParams';
import UntrustedClientError from '../../errors/UntrustedClientError';
import VoidingError from '../../errors/VoidingError';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';

export interface Options extends CommonOptions {
  readonly config: Config;
}

// tslint:disable-next-line:cyclomatic-complexity
export default ({ config, errorId, res, err }: Options): Response => {
  const { logger, translator } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: xapi-statements handled - ${msg}`, meta);
  };

  const timestamp = new Date().toISOString();
  res.setHeader('X-Experience-API-Consistent-Through', timestamp);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (err instanceof InvalidSignatureAlgorithm) {
    const code = BAD_REQUEST;
    const message = translator.invalidSignatureAlgorithmError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidX5CType) {
    const code = BAD_REQUEST;
    const message = translator.invalidX5CTypeError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidX5CChain) {
    const code = BAD_REQUEST;
    const message = translator.invalidX5CChainError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidJws) {
    const code = BAD_REQUEST;
    const message = translator.invalidJwsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidSignedStatement) {
    const code = BAD_REQUEST;
    const message = translator.invalidSignedStatementError(err);
    const obj = { message, statement: err.originalStatement };
    logError(message);
    return sendObject({ res, code, errorId, obj });
  }
  if (err instanceof JsonSyntaxError) {
    const code = BAD_REQUEST;
    const message = translator.jsonSyntaxError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof ChangedStatementRef) {
    const code = INTERNAL_SERVER_ERROR;
    const message = translator.changedStatementRefError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Conflict) {
    const code = 409;
    const message = translator.conflictError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof DataBeforeFirstBoundary) {
    const code = BAD_REQUEST;
    const message = translator.dataBeforeFirstBoundaryError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof DataBeyondFinalBoundary) {
    const code = BAD_REQUEST;
    const message = translator.dataBeyondFinalBoundaryError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof DuplicateId) {
    const code = BAD_REQUEST;
    const message = translator.duplicateIdError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof ExtraAttachments) {
    const code = BAD_REQUEST;
    const message = translator.extraAttachmentsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidBoundary) {
    const code = BAD_REQUEST;
    const message = translator.invalidBoundaryError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidContentType) {
    const code = BAD_REQUEST;
    const message = translator.invalidContentTypeError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidContentTransferEncoding) {
    const code = BAD_REQUEST;
    const message = translator.invalidContentTransferEncodingError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidMethod) {
    const code = BAD_REQUEST;
    const message = translator.invalidMethodError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof InvalidVoidType) {
    const code = BAD_REQUEST;
    const message = translator.invalidVoidTypeError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MissingAttachments) {
    const code = BAD_REQUEST;
    const message = translator.missingAttachmentsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MissingLoadedId) {
    const code = INTERNAL_SERVER_ERROR;
    const message = translator.missingLoadedIdError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof MissingStatementId) {
    const code = BAD_REQUEST;
    const message = translator.missingStatementIdError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof NoStatements) {
    const code = BAD_REQUEST;
    const message = translator.noStatementsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof QueryIds) {
    const code = BAD_REQUEST;
    const message = translator.queryIdsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof UnknownParams) {
    const code = BAD_REQUEST;
    const message = translator.unknownParamsError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof UnequalStatementId) {
    const code = BAD_REQUEST;
    const message = translator.unequalStatementIdError(err);
    logError(message);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof VoidingError) {
    const code = BAD_REQUEST;
    const message = translator.voidingErrorError(err);
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
  if (err instanceof Timeout) {
    const code = BAD_REQUEST;
    const message = translator.timeoutError(err);
    return sendMessage({ res, code, errorId, message });
  }
  return commonErrorHandler({ config, errorId, res, err });
  // tslint:disable-next-line:max-file-line-count
};
