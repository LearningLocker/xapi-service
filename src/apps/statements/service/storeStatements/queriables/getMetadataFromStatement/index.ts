import Statement from '../../../../models/Statement';
import { getBooleanMetadata } from './getBooleanMetadata';
import { getChoiceQuestionMetadata } from './getChoiceQuestionMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getLikertMetadata } from './getLikertMetadata';
import { getMatchingQuestionsMetadata } from './getMatchingQuestionsMetadata';
import { getNumericQuestionMetadata } from './getNumericQuestionMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): { readonly [key: string]: any } => {
  const likertMetadata = getLikertMetadata(statement);
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const choicesMetadata = getChoiceQuestionMetadata(statement);
  const matchingMetadata = getMatchingQuestionsMetadata(statement);
  const booleanMetadata = getBooleanMetadata(statement);
  const numericQuestionMetadata = getNumericQuestionMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...numericQuestionMetadata,
    ...choicesMetadata,
    ...matchingMetadata,
    ...booleanMetadata,
    ...likertMetadata,
  };
};
