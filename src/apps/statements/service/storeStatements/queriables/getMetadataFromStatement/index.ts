import Statement from '../../../../models/Statement';
import { getDurationMetadata } from './getDurationMetadata';
import { getLikertMetadata } from './getLikertMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const likertMetadata = getLikertMetadata(statement);
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);

  return {
    ...likertMetadata,
    ...durationMetadata,
    ...sequencingMetadata,
  };
};
