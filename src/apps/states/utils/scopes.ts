export const ALL = 'all';
export const ALL_READ = 'all/read';

export const XAPI_ALL = 'xapi/all';
export const XAPI_READ = 'xapi/read';
export const XAPI_STATE_ALL = 'state';

export const STATE_READ_SCOPES = [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_STATE_ALL,
];

export const STATE_WRITE_SCOPES = [
  ALL,
  XAPI_ALL,
  XAPI_STATE_ALL,
];

export default [
  ALL,
  ALL_READ,
  XAPI_ALL,
  XAPI_READ,
  XAPI_STATE_ALL,
];
