import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getTestProfile from '../../../../utils/getTestProfile';

export default async () => {
  const promise = getTestProfile();
  await assertError(NoModel, promise);
};
