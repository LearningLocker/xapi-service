import IdFormattedStatementBase from '../../../models/IdFormattedStatementBase';
import StatementBase from '../../../models/StatementBase';
import formatActor from './actor';
import formatContext from './context';
import formatVerb from './verb';

export default (statement: StatementBase): IdFormattedStatementBase => {
  return {
    ...statement,
    actor: formatActor(statement.actor),
    verb: formatVerb(statement.verb),
    ...(
      statement.context === undefined ? {} :
      { context: formatContext(statement.context) }
    ),
  };
};
