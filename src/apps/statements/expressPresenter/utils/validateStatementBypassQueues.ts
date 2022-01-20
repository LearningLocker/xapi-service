import { createWarning, Warnings } from 'rulr';

export const validateStatementBypassQueues = (
  statementBypassQueues: string[] | undefined,
): void | Warnings[] => {
  if (
    statementBypassQueues &&
    !statementBypassQueues.every((queueName) => queueName.startsWith('STATEMENT_'))
  ) {
    const warnings = [createWarning(statementBypassQueues, ['query', 'bypassQueues'])];
    throw new Warnings({}, ['query'], warnings);
  }
};
