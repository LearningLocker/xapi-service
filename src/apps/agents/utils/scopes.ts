export const ALL = 'all';
export const ALL_READ = 'all/read';

export const XAPI_ALL = 'xapi/all';
export const XAPI_READ = 'xapi/read';
export const XAPI_PROFILE_ALL = 'profile';

export const PROFILE_READ_SCOPES = [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_PROFILE_ALL,
];

export const PROFILE_WRITE_SCOPES = [
  ALL,
  XAPI_ALL,
  XAPI_PROFILE_ALL,
];

export default [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_PROFILE_ALL,
];
