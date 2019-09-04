import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import JsonSyntaxError from '../../../errors/JsonSyntaxError';
import assertProfile from '../../../utils/assertProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_INVALID_JSON_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with non-existing model', () => {
  setup();

  it('should create when using valid agent', async () => {
    await overwriteProfile();
    await assertProfile(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = overwriteProfile({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid json content', async () => {
    const promise = overwriteProfile({
      contentType: JSON_CONTENT_TYPE,
    }, TEST_INVALID_JSON_CONTENT);
    await assertError(JsonSyntaxError, promise);
  });
});
