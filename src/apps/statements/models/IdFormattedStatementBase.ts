import Attachment from './Attachment';
import IdFormattedActor from './IdFormattedActor';
import IdFormattedContext from './IdFormattedContext';
import IdFormattedStatementObject from './IdFormattedStatementObject';
import IdFormattedVerb from './IdFormattedVerb';
import Result from './Result';

interface IdFormattedStatementBase {
  actor: IdFormattedActor;
  object: IdFormattedStatementObject;
  verb: IdFormattedVerb;
  context?: IdFormattedContext;
  result?: Result;
  attachments?: Attachment[];
}

export default IdFormattedStatementBase;
