import * as assert from 'assert';
import getTestStates from '../../../../utils/getTestStates';

export default async () => {
  const statesResult = await getTestStates();
  assert.deepEqual(statesResult.stateIds, []);
};
