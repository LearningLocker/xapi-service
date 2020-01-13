import Statement from '../../../../models/Statement';
import { getChoiceQuestionMetadata } from './getChoiceQuestionMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const choicesMetadata = getChoiceQuestionMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...choicesMetadata,
  };
};
