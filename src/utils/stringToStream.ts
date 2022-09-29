import { Readable } from 'stream';

export const stringToStream = (data: string): Readable => {
  return Readable.from(data);
};
