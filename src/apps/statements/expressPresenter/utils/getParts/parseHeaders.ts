import { trimStart } from 'lodash';

interface Headers {
  readonly [header: string]: string;
}

const trimmedChars = `\r\n\s`;
const headerKeyBoundary = /\:\s*/;

export default (data: string) => {
  const trimmedHeaders = trimStart(data, trimmedChars);
  if (trimmedHeaders.length === 0) {
    return {};
  }
  const unparsedHeaders = trimmedHeaders.split(/\r?\n/);
  return unparsedHeaders.reduce<Headers>((parsedHeaders, unparsedHeader) => {
    const [headerKey, headerValue] = unparsedHeader.split(headerKeyBoundary);
    const lowerCaseHeaderKey = headerKey.toLowerCase();
    return {
      ...parsedHeaders,
      [lowerCaseHeaderKey]: headerValue,
    };
  }, {});
};
