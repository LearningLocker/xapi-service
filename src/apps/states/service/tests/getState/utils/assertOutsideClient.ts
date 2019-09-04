import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getTestState from '../../../../utils/getTestState';

export default async () => {
  const promise = getTestState();
  await assertError(NoModel, promise);
};
