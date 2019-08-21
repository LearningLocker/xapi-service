import { trim } from 'lodash';
import { Readable as ReadableStream } from 'stream';

const trimmedChars = `\r\n\s`;

export default async (stream: ReadableStream): Promise<string> => {
  // tslint:disable-next-line:no-let
  let data = '';

  await new Promise((resolve, reject) => {
    stream.on('data', (chunk: Buffer) => {
      data += chunk.toString('binary');
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });

  const trimmedData = trim(data, trimmedChars);
  return trimmedData;
};
