import createIdsSubStatement from '../../utils/createIdsSubStatement';
import createSubStatement from '../../utils/createSubStatement';
import verbFormatTest from './utils/verbFormatTest';

describe('get ids statement in verb', () => {
  verbFormatTest((verb: any): any => {
    return { verb };
  });
});

describe('get ids statement in sub statement verb', () => {
  verbFormatTest((verb: any): any => {
    return createSubStatement({ verb });
  }, (verb: any): any => {
    return createIdsSubStatement({ verb });
  });
});
