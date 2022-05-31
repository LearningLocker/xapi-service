import { Readable } from 'stream';
import { trim } from 'lodash';

const trimmedChars = `\r\n `;

export default async (stream: Readable): Promise<string> => {
  // eslint-disable-next-line functional/no-let
  let data = '';

  await new Promise<void>((resolve, reject) => {
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

  return trim(data, trimmedChars);
};
