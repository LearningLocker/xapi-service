import createIdsSubStatement from '../../utils/createIdsSubStatement';
import createSubStatement from '../../utils/createSubStatement';
import actorTest from './utils/actorTest';

describe('get ids statements in sub statement actor', () => {
  actorTest((actor: any): any => {
    return createSubStatement({ actor });
  }, (actor: any): any => {
    return createIdsSubStatement({ actor });
  });
});
