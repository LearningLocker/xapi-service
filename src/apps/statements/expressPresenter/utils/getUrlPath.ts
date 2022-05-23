import { parse } from 'url';
import { Request } from 'express';
import { defaultTo } from 'lodash';

export default (req: Request) => defaultTo<string>(parse(req.originalUrl).pathname, '/');
