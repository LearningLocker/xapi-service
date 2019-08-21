import Attachment from './Attachment';
import IdFormattedActor from './IdFormattedActor';
import IdFormattedContext from './IdFormattedContext';
import IdFormattedStatementObject from './IdFormattedStatementObject';
import IdFormattedVerb from './IdFormattedVerb';
import Result from './Result';

interface IdFormattedStatementBase {
  readonly actor: IdFormattedActor;
  readonly object: IdFormattedStatementObject;
  readonly verb: IdFormattedVerb;
  readonly context?: IdFormattedContext;
  readonly result?: Result;
  readonly attachments?: Attachment[];
}

export default IdFormattedStatementBase;
