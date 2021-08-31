import { StatementProcessingPriority } from '../../../enums/statementProcessingPriority.enum';

export const getPrefixWithProcessingPriority = (
  originalPrefix: string,
  priority: StatementProcessingPriority,
  isQueuePriorityEnabled?: boolean,
): string => {
  if (!isQueuePriorityEnabled) {
    return originalPrefix;
  }

  switch (priority) {
    case StatementProcessingPriority.LOW:
      return `${originalPrefix}_${StatementProcessingPriority.LOW}`;
    case StatementProcessingPriority.MEDIUM:
    default:
      return originalPrefix;
  }
};
