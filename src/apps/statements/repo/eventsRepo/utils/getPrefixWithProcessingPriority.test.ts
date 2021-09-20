import assert from 'assert';
import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';
import { getPrefixWithProcessingPriority } from './getPrefixWithProcessingPriority';

describe(__filename, () => {
  it('should return prefix properly', () => {
    const originalPrefix = 'LEARNINGLOCKER';

    assert.equal(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.MEDIUM, true),
      originalPrefix,
    );

    assert.equal(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.LOW, true),
      `${originalPrefix}_${StatementProcessingPriority.LOW}`,
    );

    assert.equal(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.LOW),
      originalPrefix,
    );
  });
});
