import createContext from './createContext';
import createIdsSubStatement from './createIdsSubStatement';

export default (contextActivities: any) => {
  return createIdsSubStatement(createContext(contextActivities));
};
