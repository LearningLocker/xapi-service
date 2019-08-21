import createIdsSubStatement from '../../utils/createIdsSubStatement';
import createSubStatement from '../../utils/createSubStatement';
import groupTest from './utils/groupTest';

describe('get ids statement in sub statement team', () => {
  groupTest((team: any): any => {
    return createSubStatement({ context: { team } });
  }, (team: any): any => {
    return createIdsSubStatement({ context: { team } });
  });
});
