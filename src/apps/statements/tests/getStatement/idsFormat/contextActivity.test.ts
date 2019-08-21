import createContext from '../../utils/createContext';
import activityFormatTest from './utils/activityFormatTest';

describe('get ids statement in parent contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ parent: [activity] });
  });
});

describe('get ids statement in grouping contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ grouping: [activity] });
  });
});

describe('get ids statement in category contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ category: [activity] });
  });
});

describe('get ids statement in other contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createContext({ other: [activity] });
  });
});
