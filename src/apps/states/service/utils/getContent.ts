import streamToString from 'stream-to-string';
import { jsonContentType, textContentType } from '../../utils/constants';
import { jsonContentTypePattern } from '../../utils/contentTypePatterns';
import parseJson from '../../utils/parseJSON';

const jsonStartPattern = /^(\{|\[|\".*\"$|[0-9]+$|true$|false$)/i;

export interface Opts {
  readonly stream: NodeJS.ReadableStream;
  readonly contentType: string;
}

export interface Result {
  readonly content: any;
  readonly contentType: string;
}

export default async ({ stream, contentType }: Opts): Promise<Result> => {
  if (jsonContentTypePattern.test(contentType)) {
    const data = await streamToString(stream);
    const dataIsJson = jsonStartPattern.test(data);
    if (dataIsJson) {
      const content = parseJson(data, ['content']);
      return { content, contentType: jsonContentType };
    } else {
      return { content: data, contentType: textContentType };
    }
  }
  return { content: undefined, contentType };
};
