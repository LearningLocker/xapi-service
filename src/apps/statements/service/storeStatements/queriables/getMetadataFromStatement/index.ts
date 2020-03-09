import Statement from '../../../../models/Statement';
import { getBooleanMetadata } from './getBooleanMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getMatchingQuestionsMetadata } from './getMatchingQuestionsMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): { readonly [key: string]: any } => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const matchingMetadata = getMatchingQuestionsMetadata(statement);
  const booleanMetadata = getBooleanMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...matchingMetadata,
    ...booleanMetadata,
  };
};
