import { trimStart } from 'lodash';
import stringToStream from 'string-to-stream';
import Part from '../../../models/Part';
import parseHeaders from './parseHeaders';

const trimmedChars = `\r\n\s`;
const headerBoundary = /\n{2}|(\r\n){2}/;

export default (streamPart: string): Part => {
  const boundaryIndex = streamPart.search(headerBoundary);
  const hasBoundaryIndex = boundaryIndex !== -1;
  const partLength = streamPart.length;
  const unparsedHeaders = streamPart.slice(0, hasBoundaryIndex ? boundaryIndex : partLength);
  const content = streamPart.slice(hasBoundaryIndex ? boundaryIndex : partLength);
  const trimmedContent = trimStart(content, trimmedChars);

  const stream = stringToStream(trimmedContent);
  const headers = parseHeaders(unparsedHeaders);

  return { stream, headers };
};
