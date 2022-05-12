import assert from 'assert';
import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';
import { getPrefixWithProcessingPriority } from './getPrefixWithProcessingPriority';

describe(__filename, () => {
  it('should return prefix properly', () => {
    const originalPrefix = 'LEARNINGLOCKER';

    assert.strictEqual(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.MEDIUM, true),
      originalPrefix,
    );

    assert.strictEqual(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.LOW, true),
      `${originalPrefix}_${StatementProcessingPriority.LOW}`,
    );

    assert.strictEqual(
      getPrefixWithProcessingPriority(originalPrefix, StatementProcessingPriority.LOW),
      originalPrefix,
    );
  });
});
