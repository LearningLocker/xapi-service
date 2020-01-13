import Statement from '../../../../models/Statement';
import { getChoiceQuestionMetadata } from './getChoiceQuestionMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getMatchingQuestionsMetadata } from './getMatchingQuestionsMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const choicesMetadata = getChoiceQuestionMetadata(statement);
  const matchingMetadata = getMatchingQuestionsMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...choicesMetadata,
    ...matchingMetadata,
  };
};
