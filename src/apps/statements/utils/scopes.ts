export const ALL = 'all';
export const ALL_READ = 'all/read';

export const XAPI_ALL = 'xapi/all';
export const XAPI_READ = 'xapi/read';
export const XAPI_STATEMENTS_READ = 'statements/read';
export const XAPI_STATEMENTS_WRITE = 'statements/write';
export const XAPI_STATEMENTS_READ_MINE = 'statements/read/mine';
export const XAPI_STATE_ALL = 'state';
export const XAPI_PROFILE_ALL = 'profile';

export const STATEMENT_READ_SCOPES = [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_STATEMENTS_READ,
  XAPI_STATEMENTS_READ_MINE,
];

export const PROFILE_READ_SCOPES = [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_PROFILE_ALL,
];

export const STATEMENT_WRITE_SCOPES = [
  ALL,
  XAPI_ALL,
  XAPI_STATEMENTS_WRITE,
];

export default [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_STATEMENTS_READ,
  XAPI_STATEMENTS_READ_MINE,
  XAPI_STATEMENTS_WRITE,
  XAPI_STATE_ALL,
  XAPI_PROFILE_ALL,
];
