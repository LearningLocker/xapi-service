import { Dictionary } from 'lodash';
import Statement from '../../../models/Statement';

export default (statements: Statement[]): Dictionary<Statement> => {
  return statements.reduce((result: Dictionary<Statement>, statement) => {
    return {
      ...result,
      [statement.id]: statement,
    };
  }, {} as Dictionary<Statement>);
};
