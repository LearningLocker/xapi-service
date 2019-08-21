import Actor from './Actor';
import Attachment from './Attachment';
import Context from './Context';
import Result from './Result';
import StatementObject from './StatementObject';
import Verb from './Verb';

interface StatementBase {
  actor: Actor;
  object: StatementObject;
  verb: Verb;
  context?: Context;
  result?: Result;
  attachments?: Attachment[];
}

export default StatementBase;
