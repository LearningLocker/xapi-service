import Actor from './Actor';
import Attachment from './Attachment';
import Context from './Context';
import Result from './Result';
import StatementObject from './StatementObject';
import Verb from './Verb';

interface StatementBase {
  readonly actor: Actor;
  readonly object: StatementObject;
  readonly verb: Verb;
  readonly context?: Context;
  readonly result?: Result;
  readonly attachments?: Attachment[];
}

export default StatementBase;
