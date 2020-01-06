import Statement from '../../../../models/Statement';
import { getChoiceQuestionMetadata } from './getChoiceQuestionMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const sequencingMetadata = getSequencingMetadata(statement);

  if (sequencingMetadata) {
    return sequencingMetadata;
  }

  const choicesMetadata = getChoiceQuestionMetadata(statement);

  if (choicesMetadata) {
    return choicesMetadata;
  }

  const durationMetadata = getDurationMetadata(statement);

  if (durationMetadata) {
    return durationMetadata;
  }

  return {};
};
