import Statement from '../../../../models/Statement';
import { getChoiceQuestionMetadata } from './getChoiceQuestionMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const sequencingMetadata = getSequencingMetadata(statement);
  const choicesMetadata = getChoiceQuestionMetadata(statement);
  const durationMetadata = getDurationMetadata(statement);

  return {
    ...(sequencingMetadata ? sequencingMetadata : {}),
    ...(choicesMetadata ? choicesMetadata : {}),
    ...(durationMetadata ? durationMetadata : {}),
  };
};
