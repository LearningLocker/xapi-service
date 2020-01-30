import Statement from '../../../../models/Statement';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
  };
};
