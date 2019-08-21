import StatementBase from '../../../models/StatementBase';
import formatContext from './context';
import formatVerb from './verb';

export default (statement: StatementBase, langs: string[]): StatementBase => {
  return {
    ...statement,
    verb: formatVerb(statement.verb, langs),
    ...(
      statement.context === undefined ? {} :
      { context: formatContext(statement.context, langs) }
    ),
  };
};
