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
  assert.deepStrictEqual(actualStateIds, expectedStateIds);

  // Checks the content.
  const agentStateResult = await getTestState(optsOverrides);
  const actualContent = await streamToString(agentStateResult.content);
  assert.strictEqual(actualContent, content);
  assert.strictEqual(agentStateResult.contentType.constructor, String);
  assert.strictEqual(agentStateResult.updatedAt.constructor, Date);
  assert.strictEqual(agentStateResult.etag.constructor, String);
};
