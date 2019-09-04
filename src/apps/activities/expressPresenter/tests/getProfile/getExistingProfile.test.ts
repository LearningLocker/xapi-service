import { OK } from 'http-status-codes';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_CONTENT,
  TEST_JSON_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfile from './utils/getProfile';

describe('expressPresenter.getProfile with existing state', () => {
  setup();

  it('should get when getting text', async () => {
    await createTextProfile();
    await getProfile().expect(OK, TEST_CONTENT);
  });

  it('should get when getting json', async () => {
    await createJsonProfile();
    await getProfile().expect(OK, JSON.parse(TEST_JSON_CONTENT));
  });
});
