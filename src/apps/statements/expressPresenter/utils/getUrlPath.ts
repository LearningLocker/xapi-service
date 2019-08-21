import { Request } from 'express';
import { defaultTo } from 'lodash';
import { parse } from 'url';

export default (req: Request) => defaultTo<string>(parse(req.originalUrl).pathname, '/');
