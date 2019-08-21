import { Request } from 'express';
import { defaultTo, get } from 'lodash';
import streamToString from 'stream-to-string';
import InvalidBoundary from '../../errors/InvalidBoundary';
import InvalidContentTransferEncoding from '../../errors/InvalidContentTransferEncoding';
import NoStatements from '../../errors/NoStatements';
import AttachmentModel from '../../models/AttachmentModel';
import parseJson from '../../utils/parseJson';
import { jsonContentTypePattern } from '../utils/contentTypePatterns';
import getParts from '../utils/getParts';

// tslint:disable-next-line:max-line-length
const BOUNDARY_REGEXP = /boundary\=((?:\"(?:[A-Za-z\d\'\(\)\+\_\,\-\.\/\:\=\?]+)\")|(?:[A-Za-z\d\-]+))/;

const getBoundaryFromContentType = (contentType: string): string => {
  const result = BOUNDARY_REGEXP.exec(contentType);
  if (result === null || result.length < 1 || result.length > 2) {
    throw new InvalidBoundary(contentType);
  }
  return result[1].replace(/\"/g, '');
};

export default async (req: Request) => {
  const contentType = defaultTo(req.header('Content-Type'), '');
  const boundary = getBoundaryFromContentType(contentType);
  const parts = await getParts(req, boundary);
  const hasStatements = (
    parts.length >= 1 &&
    jsonContentTypePattern.test(get<any, string, string>(parts[0].headers, 'content-type', ''))
  );

  if (!hasStatements) {
    throw new NoStatements();
  }

  const unparsedBody = await streamToString(parts[0].stream);
  const body = parseJson(unparsedBody, ['body']);
  const attachments = parts.slice(1).map((part): AttachmentModel => {
    const contentTransferEncoding = get(
      part.headers,
      'content-transfer-encoding',
    ) as string | undefined;
    if (contentTransferEncoding !== 'binary') {
      throw new InvalidContentTransferEncoding(contentTransferEncoding);
    }
    return {
      stream: part.stream,
      hash: get(part.headers, 'x-experience-api-hash') as string,
      contentType: get(part.headers, 'content-type') as string,
    };
  });

  return { body, attachments };
};
