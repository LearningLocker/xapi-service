import { BAD_REQUEST, OK } from 'http-status-codes';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_INVALID_AGENT,
  TEST_INVALID_JSON_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfiles from './utils/getProfiles';

describe('expressPresenter.getProfiles with existing model', () => {
  setup();

  it('should return profile ids when getting a existing model', async () => {
    await createTextProfile();
    await getProfiles().expect(OK, [TEST_PROFILE_ID]);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await getProfiles({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await getProfiles({ agent: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using invalid json in agent', async () => {
    await getProfiles({
      agent: TEST_INVALID_JSON_CONTENT,
    }).expect(BAD_REQUEST);
  });
});
