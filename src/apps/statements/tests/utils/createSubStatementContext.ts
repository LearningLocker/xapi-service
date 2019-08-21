import createContext from './createContext';
import createSubStatement from './createSubStatement';

export default (contextActivities: any) => {
  return createSubStatement(createContext(contextActivities));
};
