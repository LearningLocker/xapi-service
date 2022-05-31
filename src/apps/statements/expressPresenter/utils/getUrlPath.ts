import { URL } from 'url';
import { Request } from 'express';
import { defaultTo } from 'lodash';

export default (req: Request) =>
  defaultTo<string>(new URL(req.originalUrl, 'http://localhost').pathname, '/');
