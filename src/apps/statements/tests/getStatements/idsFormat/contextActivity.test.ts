import createContext from '../../utils/createContext';
import activityFormatTest from './utils/activityFormatTest';

describe('get ids statements in parent contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ parent: [activity] });
  });
});

describe('get ids statements in grouping contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ grouping: [activity] });
  });
});

describe('get ids statements in category contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ category: [activity] });
  });
});

describe('get ids statements in other contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ other: [activity] });
  });
});
