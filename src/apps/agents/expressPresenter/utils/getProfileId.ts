import { createRequiredWarning, Warnings } from 'rulr';

export default (profileIdParam: string|undefined) => {
  if (profileIdParam === undefined) {
    const warnings = [createRequiredWarning(profileIdParam, ['query', 'profileId'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return profileIdParam;
};
