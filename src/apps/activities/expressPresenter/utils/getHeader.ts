import { Request } from 'express';
import { defaultTo } from 'lodash';

const getHeader = (req: Request, name: string, defaultVal: any = undefined ): string => {
  return defaultTo(req.body[name], defaultTo<string>(req.header(name), defaultVal));
};

export default getHeader;
