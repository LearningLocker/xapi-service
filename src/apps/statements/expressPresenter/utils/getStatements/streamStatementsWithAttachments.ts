import { reduce } from 'bluebird';
import AttachmentModel from '../../../models/AttachmentModel';

export const boundary = 'zzzlearninglockerzzz';

export default async (
  jsonResponse: Object,
  attachments: AttachmentModel[],
  stream: NodeJS.WritableStream,
) => {
  const crlf = '\r\n';
  const fullBoundary = `${crlf}--${boundary}${crlf}`;
  const stringResponse = JSON.stringify(jsonResponse);
  stream.write(fullBoundary);
  stream.write(`Content-Type:application/json; charset=UTF-8${crlf}`);
  stream.write(`Content-Length:${stringResponse.length}${crlf}`);
  stream.write(crlf);
  stream.write(stringResponse);
  await Promise.resolve(
    reduce<AttachmentModel, Promise<void>>(attachments, (_result, attachment) => {
      return new Promise<void>((resolve, reject) => {
        stream.write(fullBoundary);
        stream.write(`Content-Type:${attachment.contentType}${crlf}`);
        if (attachment.contentLength !== undefined) {
          stream.write(`Content-Length:${attachment.contentLength}${crlf}`);
        }
        stream.write(`Content-Transfer-Encoding:binary${crlf}`);
        stream.write(`X-Experience-API-Hash:${attachment.hash}${crlf}`);
        stream.write(crlf);
        attachment.stream.on('data', (data: any) => {
          stream.write(data);
        });
        attachment.stream.on('end', () => {
          stream.write(crlf);
          resolve();
        });
        attachment.stream.on('error', (err: any) => {
          reject(err);
        });
      });
    }, Promise.resolve()),
  );
  stream.write(`--${boundary}--`);
  stream.end();
  return;
};
