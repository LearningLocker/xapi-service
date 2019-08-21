import { Readable as ReadableStream } from 'stream';
import Part from '../../../models/Part';
import getStreamData from '../../../utils/getStreamData';
import createPart from './createPart';
import getStreamParts from './getStreamParts';

export default async (stream: ReadableStream, boundary: string): Promise<Part[]> => {
  const streamData = await getStreamData(stream);
  const streamParts = getStreamParts(streamData, boundary);
  const parts: Part[] = streamParts.map(createPart);
  return parts;
};
