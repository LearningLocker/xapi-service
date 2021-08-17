import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';

export const getPrefixWithProcessingPriority = (
  originalPrefix: string,
  priority: StatementProcessingPriority,
): string => {
  switch (priority) {
    case StatementProcessingPriority.LOW:
      return `${originalPrefix}_${StatementProcessingPriority.LOW}`;
    case StatementProcessingPriority.MEDIUM:
    default:
      return originalPrefix;
  }
};
