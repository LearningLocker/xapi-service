import Activity            from './Activity';
import Actor               from './Actor';
import InteractionActivity from './InteractionActivity';
import StatementRef        from './StatementRef';

type SubStatementObject = (Activity|InteractionActivity|Actor|StatementRef);

export default SubStatementObject;
