import express from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { v4 as createV4UUID } from 'uuid';
import { handleErrorViaHttp } from './handleErrorViaHttp';
import { HttpHandler, HttpHeaders, HttpQueryParams, HttpRequest } from './HttpInterfaces';

function getExpressRequestHeaders(req: express.Request) {
  return Object.keys(req.headers).reduce<HttpHeaders>((result, header) => {
    const headerValue = req.headers[header];
    if (typeof headerValue === 'string') {
      return { ...result, [header]: headerValue };
    } else if (Array.isArray(headerValue)) {
      return { ...result, [header]: headerValue[headerValue.length - 1] };
    }
    return result;
  }, {});
}

function getExpressRequestQuery(req: express.Request) {
  return Object.keys(req.query).reduce<HttpQueryParams>((result, param) => {
    const paramValue = req.query[param];
    if (typeof paramValue === 'string') {
      return { ...result, [param]: paramValue };
    } else if (Array.isArray(paramValue)) {
      const firstParamValue = paramValue[paramValue.length - 1];
      if (typeof firstParamValue === 'string') {
        return { ...result, [param]: firstParamValue };
      }
      return { ...result, [param]: JSON.stringify(firstParamValue) };
    } else if (typeof paramValue === 'object') {
      return { ...result, [param]: JSON.stringify(paramValue) };
    }
    return result;
  }, {});
}

export function createExpressHandler<Config>(handler: HttpHandler<Config>) {
  return (config: Config) => {
    return async (req: express.Request, res: express.Response) => {
      const requestId = createV4UUID();
      try {
        const body = req;
        const headers = getExpressRequestHeaders(req);
        const query = getExpressRequestQuery(req);
        const request: HttpRequest = { requestId, query, body, headers };
        const response = await handler(config, request).catch((err) => {
          return handleErrorViaHttp(request, err);
        });
        res.writeHead(response.statusCode, response.headers);
        if (response.body !== undefined) {
          response.body.pipe(res);
        }
        res.end();
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.error(requestId, err);
        res.status(INTERNAL_SERVER_ERROR);
        res.send(`Internal Server Error ${requestId}`);
      }
    };
  };
}
