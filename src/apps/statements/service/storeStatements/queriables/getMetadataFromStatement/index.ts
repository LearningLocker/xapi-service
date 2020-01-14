import Statement from '../../../../models/Statement';
import { getDurationMetadata } from './getDurationMetadata';
import { getNumericQuestionMetadata } from './getNumericQuestionMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const numericQuestionMetadata = getNumericQuestionMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...numericQuestionMetadata,
  };
};
