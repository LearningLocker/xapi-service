import { createRequiredWarning, Warnings } from 'rulr';

export default (stateIdParam: string|undefined) => {
  if (stateIdParam === undefined) {
    const warnings = [createRequiredWarning(stateIdParam, ['query', 'stateId'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return stateIdParam;
};
