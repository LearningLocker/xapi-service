import assert from 'assert';
import JsonSyntaxError from '../errors/JsonSyntaxError';
import parseJson from '../utils/parseJson';

describe('parseJson', () => {
  const OBJ = { foo: 'bar' };
  const VALID_JSON = JSON.stringify(OBJ);
  const INVALID_JSON = `abc${VALID_JSON}`;

  it('should parse JSON', async () => {
    const parsedJson = parseJson(VALID_JSON, ['test']);
    assert.deepEqual(parsedJson, OBJ);
  });

  it('should throw warning when parsing invalid JSON', async () => {
    assert.throws(() => {
      parseJson(INVALID_JSON, ['test']);
    }, JsonSyntaxError);
  });
});
