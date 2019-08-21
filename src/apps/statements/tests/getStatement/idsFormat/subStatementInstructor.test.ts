import createIdsSubStatement from '../../utils/createIdsSubStatement';
import createSubStatement from '../../utils/createSubStatement';
import agentTest from './utils/agentTest';

describe('get ids statement in sub statement instructor', () => {
  agentTest((instructor: any): any => {
    return createSubStatement({ context: { instructor } });
  }, (instructor: any): any => {
    return createIdsSubStatement({ context: { instructor } });
  });
});
