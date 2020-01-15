import Statement from '../../../../models/Statement';
import { getBooleanMetadata } from './getBooleanMetadata';
import { getDurationMetadata } from './getDurationMetadata';
import { getSequencingMetadata } from './getSequencingMetadata';

export default (statement: Statement): {readonly [key: string]: any} => {
  const durationMetadata = getDurationMetadata(statement);
  const sequencingMetadata = getSequencingMetadata(statement);
  const booleanMetadata = getBooleanMetadata(statement);

  return {
    ...durationMetadata,
    ...sequencingMetadata,
    ...booleanMetadata,
  };
};
