import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  PRECONDITION_FAILED,
  UNAUTHORIZED,
} from 'http-status-codes';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import NoModel from 'jscommons/dist/errors/NoModel';
import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import { Warnings } from 'rulr';
import stringToStream from 'string-to-stream';
import ExpiredClientError from '../../../errors/ExpiredClientError';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import UntrustedClientError from '../../../errors/UntrustedClientError';
import { jsonContentType, xapiHeaderVersion } from '../../../utils/constants';
import { HttpRequest, HttpResponse } from './HttpInterfaces';
import { translateWarning } from './translateWarning';

function createErrorResponse(statusCode: number, jsonBody: object): HttpResponse {
  return {
    statusCode,
    headers: {
      'X-Experience-API-Version': xapiHeaderVersion,
      'Content-Type': jsonContentType,
    },
    body: stringToStream(JSON.stringify(jsonBody)),
  };
}

// tslint:disable-next-line: no-any
export function handleErrorViaHttp(req: HttpRequest, err?: any) {
  if (err instanceof Unauthorised) {
    return createErrorResponse(UNAUTHORIZED, {
      message: 'Unauthorized',
      requestId: req.requestId,
    });
  }
  if (err instanceof NoModel) {
    return createErrorResponse(NOT_FOUND, {
      message: `No ${err.modelName} found`,
      requestId: req.requestId,
    });
  }
  if (err instanceof Warnings) {
    return createErrorResponse(BAD_REQUEST, {
      warnings: err.warnings.map(translateWarning),
      requestId: req.requestId,
    });
  }
  if (err instanceof IfMatch) {
    return createErrorResponse(PRECONDITION_FAILED, {
      message: 'IfMatch does not match Etag because a modification has been made since it was retrieved',
      requestId: req.requestId,
    });
  }
  if (err instanceof IfNoneMatch) {
    return createErrorResponse(PRECONDITION_FAILED, {
      message: 'IfNoneMatch was used to detect that the resource was already present',
      requestId: req.requestId,
    });
  }
  if (err instanceof Forbidden) {
    return createErrorResponse(FORBIDDEN, {
      message: 'Forbidden',
      requestId: req.requestId,
    });
  }
  if (err instanceof ExpiredClientError) {
    return createErrorResponse(FORBIDDEN, {
      message: 'Your organisation has expired',
      requestId: req.requestId,
    });
  }
  if (err instanceof UntrustedClientError) {
    return createErrorResponse(FORBIDDEN, {
      message: 'Your client has been disabled',
      requestId: req.requestId,
    });
  }
  // tslint:disable-next-line: no-console
  console.error(req.requestId, err);
  return createErrorResponse(INTERNAL_SERVER_ERROR, {
    message: 'A server error occurred',
    requestId: req.requestId,
  });
}
