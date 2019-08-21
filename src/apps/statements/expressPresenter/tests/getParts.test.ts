import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import assert from 'assert';
import { map } from 'lodash';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import { Readable as ReadableStream } from 'stream';
import streamToString from 'stream-to-string';
import Part from '../../models/Part';
import getParts from '../utils/getParts';

const TEST_BOUNDARY = 'test_boundary';
const TEST_CONTENT = 'test_content';
const TEST_HEADERS = {
  'content-type': 'application/json',
};
const crlf = '\r\n';
const TEST_PART_BOUNDARY = `${crlf}--${TEST_BOUNDARY}`;
const TEST_PART = {
  content: TEST_CONTENT,
  headers: TEST_HEADERS,
};

const partToTestPart = async (part: Part) => {
  return {
    content: await streamToString(part.stream),
    headers: part.headers,
  };
};

const getTestParts = async (stream: ReadableStream, boundary: string) => {
  const actualParts = await getParts(stream, boundary);
  const testPartsPromises = actualParts.map(partToTestPart);
  const testParts = await Promise.all(testPartsPromises);
  return testParts;
};

const headersToString = (headers: { readonly [key: string]: string }): string => {
  const headerStrings = map(headers, (headerValue: string, headerKey: string) => {
    return `${headerKey}:${headerValue}`;
  });
  return headerStrings.join(crlf);
};

describe('expressPresenter/utils/getParts', () => {
  it('should return no parts when there are no parts.', async () => {
    const stream = new ReadableStream();
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    assert.deepEqual(actualParts, []);
  });

  it('should return one part when there is one part without headers in one chunk', async () => {
    const headers = {};
    const testHeaders = `${crlf}`;
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${testHeaders}${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [{ content: TEST_CONTENT, headers }];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should return one part when there is one part without content in one chunk', async () => {
    const testHeaders = `${crlf}${headersToString(TEST_HEADERS)}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${testHeaders}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [{ content: '', headers: TEST_HEADERS }];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should return one part when there is one part with headers in one chunk', async () => {
    const testHeaders = `${crlf}${headersToString(TEST_HEADERS)}`;
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${testHeaders}${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should return one part when the start of the header boundary is across two chunks',
    async () => {
      const testHeaders = headersToString(TEST_HEADERS);
      const stream = new ReadableStream();
      stream.push(`${TEST_PART_BOUNDARY}\r\n${testHeaders}\r`);
      stream.push(`\n\r\n${TEST_CONTENT}${TEST_PART_BOUNDARY}--`);
      stream.push(null);
      const actualParts = await getTestParts(stream, TEST_BOUNDARY);
      const expectedParts = [TEST_PART];
      assert.deepEqual(actualParts, expectedParts);
    },
  );

  it('should return one part when the end of the header boundary is across two chunks',
    async () => {
      const testHeaders = headersToString(TEST_HEADERS);
      const stream = new ReadableStream();
      stream.push(`${TEST_PART_BOUNDARY}\r\n${testHeaders}\r\n\r`);
      stream.push(`\n${TEST_CONTENT}${TEST_PART_BOUNDARY}--`);
      stream.push(null);
      const actualParts = await getTestParts(stream, TEST_BOUNDARY);
      const expectedParts = [TEST_PART];
      assert.deepEqual(actualParts, expectedParts);
    },
  );

  it('should return two parts when the start of the part boundary is across two chunks',
    async () => {
      const testHeaders = `${crlf}${headersToString(TEST_HEADERS)}`;
      const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
      const stream = new ReadableStream();
      const startOfPartBoundary = TEST_PART_BOUNDARY.slice(0, 1);
      const restOfPartBoundary = TEST_PART_BOUNDARY.slice(1);
      stream.push(`${TEST_PART_BOUNDARY}${testHeaders}${testContent}${startOfPartBoundary}`);
      stream.push(`${restOfPartBoundary}${testHeaders}${testContent}${TEST_PART_BOUNDARY}--`);
      stream.push(null);
      const actualParts = await getTestParts(stream, TEST_BOUNDARY);
      const expectedParts = [TEST_PART, TEST_PART];
      assert.deepEqual(actualParts, expectedParts);
    },
  );

  it('should return two parts when the end of the part boundary is across two chunks', async () => {
    const testHeaders = `${crlf}${headersToString(TEST_HEADERS)}`;
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    const endOfPartBoundary = TEST_PART_BOUNDARY.slice(-1);
    const restOfPartBoundary = TEST_PART_BOUNDARY.slice(0, -1);
    stream.push(`${TEST_PART_BOUNDARY}${testHeaders}${testContent}${restOfPartBoundary}`);
    stream.push(`${endOfPartBoundary}${testHeaders}${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART, TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should return headers when the header separator is in the first chunk', async () => {
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${crlf}Content-Type:`);
    stream.push(`application/json${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should return headers when the header separator is in the second chunk', async () => {
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${crlf}Content-Type`);
    stream.push(`:application/json${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should not error when there is content before the first boundary', async () => {
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`invalid_content${TEST_PART_BOUNDARY}${crlf}Content-Type`);
    stream.push(`:application/json${testContent}${TEST_PART_BOUNDARY}--`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should not error when there is content after the final boundary', async () => {
    const testContent = `${crlf}${crlf}${TEST_CONTENT}`;
    const stream = new ReadableStream();
    stream.push(`${TEST_PART_BOUNDARY}${crlf}Content-Type`);
    stream.push(`:application/json${testContent}${TEST_PART_BOUNDARY}--invalid_content`);
    stream.push(null);
    const actualParts = await getTestParts(stream, TEST_BOUNDARY);
    const expectedParts = [TEST_PART];
    assert.deepEqual(actualParts, expectedParts);
  });

  it('should throw error when there is an error in the stream', async () => {
    const stream = new ReadableStream();
    const error = new Error();
    try {
      stream.push('hello');
      stream.emit('error', error);
    } catch {
      // Do nothing.
    }
    try {
      await getTestParts(stream, TEST_BOUNDARY);
      /* istanbul ignore next */
      assert.fail('Expected error to be thrown.');
    } catch {
      // Do nothing.
    }
  });
  // tslint:disable-next-line:max-file-line-count
});
