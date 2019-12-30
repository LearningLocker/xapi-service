import Statement from '../../../../models/Statement';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);

  if (durationMetadata) {
    return durationMetadata;
  }

  const sequencingMetadata = getSequencingMetadata(statement);

  if (sequencingMetadata) {
    return sequencingMetadata;
  }

  return {};
};
