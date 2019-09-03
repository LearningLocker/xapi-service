import * as assert from 'assert';
import streamToString from 'stream-to-string';
import GetStatesOptions from '../serviceFactory/options/GetStatesOptions';
import getTestState from './getTestState';
import getTestStates from './getTestStates';
import { TEST_STATE_ID } from './testValues';

export default async (content: string, optsOverrides: Partial<GetStatesOptions> = {}) => {
  const expectedStateIds = [TEST_STATE_ID];

  // Checks the stateIds.
  const statesResult = await getTestStates(optsOverrides);
  const actualStateIds = statesResult.stateIds;
  assert.deepEqual(actualStateIds, expectedStateIds);

  // Checks the content.
  const agentStateResult = await getTestState(optsOverrides);
  const actualContent = await streamToString(agentStateResult.content);
  assert.equal(actualContent, content);
  assert.equal(agentStateResult.contentType.constructor, String);
  assert.equal(agentStateResult.updatedAt.constructor, Date);
  assert.equal(agentStateResult.etag.constructor, String);
};
