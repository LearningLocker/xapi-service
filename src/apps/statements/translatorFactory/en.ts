import commonTranslator from 'jscommons/dist/translatorFactory/en';
import stringPath from 'jscommons/dist/translatorFactory/utils/stringPath';
import Translator from './Translator';

const translator: Translator = {
  changedStatementRefError: (err) => `${err.statementId} is no longer a statement reference`,
  conflictError: (err) => `${err.statementId} is conflicting`,
  dataBeforeFirstBoundaryError: () => 'There was data before the first boundary',
  dataBeyondFinalBoundaryError: () => 'There was data beyond the final boundary',
  duplicateIdError: (err) => `${err.statementId} is duplicated in the current batch`,
  expiredClientError: () => `Your organisation has expired`,
  invalidBoundaryError: (err) => `Content-Type (${err.contentType}) contains an invalid boundary`,
  jsonSyntaxError: (err) => {
    const path = stringPath(err.path);
    return `Expected valid JSON in ${path}`;
  },
  invalidContentTypeError: (err) => `Content-Type (${err.contentType}) is not supported`,
  invalidContentTransferEncodingError: (err) =>
    `Content-Transfer-Encoding (${err.contentTransferEncoding}) is not supported`,
  invalidMethodError: (err) => `Method (${err.method}) is invalid for alternate request syntax`,
  invalidVoidTypeError: (err) => `Voider 'objectType' ('${err.objectType}) must be 'StatementRef'`,
  missingAttachmentsError: (err) => `Received missing attachments (${err.hashes.join(', ')})`,
  extraAttachmentsError: (err) => `Received extra attachments (${err.hashes.join(', ')})`,
  missingLoadedIdError: (err) => `Eager loaded '${err.targetId}' is now missing`,
  missingStatementIdError: () => 'Missing required \'statementId\' query param',
  noStatementsError: () => 'No statements in request content',
  queryIdsError: () => 'Cannot use \'statementId\' and \'voidedStatementId\'',
  unknownParamsError: (err) => {
    return `Cannot use unknown params '${err.unknownParams.join(', ')}'`;
  },
  unequalStatementIdError: (err) => `Statement id must match the query param (${err.statementId})`,
  voidingErrorError: (err) => {
    const voiders = err.voidedStatementIds.join(', ');
    return `Voider cannot void another voider (${voiders})`;
  },
  invalidX5CTypeError: (err) => {
    return `X5C header should be an array for '${err.statementId}'`;
  },
  invalidX5CChainError: (err) => {
    return `X5C header should have at least one element for '${err.statementId}'`;
  },
  invalidJwsError: (err) => {
    return `Invalid JWS for '${err.statementId}'`;
  },
  invalidSignedStatementError: (err) => {
    return `Signed statement should match original statement for '${err.originalStatement.id}'`;
  },
  invalidSignatureAlgorithmError: (err) => {
    return `Invalid JWS algorithm for '${err.statementId}'`;
  },
  timeoutError: (err) => {
    return `Request was timed out after ${err.timeoutMs}ms`;
  },
  untrustedClientError: () => 'Your client has been disabled',
  ...commonTranslator,
};

export default translator;
