import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import GetStatesOptions from '../serviceFactory/options/GetStatesOptions';
import getTestState from './getTestState';
import getTestStates from './getTestStates';

export default async (optsOverrides: Partial<GetStatesOptions> = {}) => {
  // Asserts that the agent has no states.
  const getStatesResult = await getTestStates(optsOverrides);
  assert.deepEqual([], getStatesResult.stateIds);

  // Asserts that the state does not exist.
  const getStatePromise = getTestState(optsOverrides);
  await assertError(NoModel, getStatePromise);
};
