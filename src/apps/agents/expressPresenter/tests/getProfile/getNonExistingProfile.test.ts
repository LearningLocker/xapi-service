import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import {
  TEST_INVALID_AGENT,
  TEST_INVALID_JSON_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfile from './utils/getProfile';

describe('expressPresenter.getProfile with non-existing model', () => {
  setup();

  it('should error when getting a non-existing model', async () => {
    await getProfile().expect(NOT_FOUND);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await getProfile({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await getProfile({ agent: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using invalid json in agent', async () => {
    await getProfile({
      agent: TEST_INVALID_JSON_CONTENT,
    }).expect(BAD_REQUEST);
  });
});
