import { createWarning, Warnings } from 'rulr';

import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';

export const validateStatementProcessingPriority = (
  statementProcessingPriority: string | undefined,
): void | Warnings[] => {
  if (
    statementProcessingPriority &&
    !Object.values(StatementProcessingPriority).includes(
      statementProcessingPriority as StatementProcessingPriority,
    )
  ) {
    const warnings = [createWarning(statementProcessingPriority, ['query', 'priority'])];
    throw new Warnings({}, ['query'], warnings);
  }
};
