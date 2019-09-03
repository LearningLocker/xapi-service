import { createRequiredWarning, Warnings } from 'rulr';

export default (activityIdParam: string|undefined) => {
  if (activityIdParam === undefined) {
    const warnings = [createRequiredWarning(activityIdParam, ['query', 'activityId'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return activityIdParam;
};
