import ClientModel from '../models/ClientModel';
import { jsonContentType } from '../utils/constants';
import { ALL, XAPI_PROFILE_ALL } from './scopes';

export const TEST_CLIENT: ClientModel = {
  _id: '58fe13e34effd3c26a7fc4b8',
  isTrusted: true,
  lrs_id: '58fe13e34effd3c26a7fc4b7',
  organisation: '58fe13e34effd3c26a7fc4b6',
  scopes: [ALL],
};

export const TEST_INVALID_SCOPE_TOKEN = 'invalid_scope_client';
export const TEST_INVALID_SCOPE_CLIENT: ClientModel = {
  ...TEST_CLIENT,
  scopes: ['invalid_scope'],
};

export const TEST_VALID_SCOPE_TOKEN = 'valid_scope_client';
export const TEST_VALID_SCOPE_CLIENT: ClientModel = {
  ...TEST_CLIENT,
  scopes: [XAPI_PROFILE_ALL],
};

export const TEST_OUTSIDE_STORE_TOKEN = 'outside_store_client';
export const TEST_CLIENT_OUTSIDE_STORE: ClientModel = {
  ...TEST_CLIENT,
  lrs_id: '58fe13e34effd3c26a7fc4c7',
};

export const TEST_OUTSIDE_ORG_TOKEN = 'outside_org_client';
export const TEST_CLIENT_OUTSIDE_ORG: ClientModel = {
  ...TEST_CLIENT,
  organisation: '58fe13e34effd3c26a7fc4c6',
};

export const TEST_UNTRUSTED_TOKEN = 'untrusted_client';
export const TEST_EXPIRED_ORG_TOKEN = 'expired_org_client';
export const TEST_MISSING_TOKEN = 'Basic missing_token';

export const TEST_ACTIVITY_ID = 'http://www.example.com';
export const TEST_IMMUTABLE_ACTIVITY_ID = 'http://www.example.org';
export const TEST_INVALID_ACTIVITY_ID = 'http';
export const TEST_PROFILE_ID = 'dummy_profile_id';
export const TEST_IMMUTABLE_PROFILE_ID = 'immutable_profile_id';
export const TEST_INVALID_TIMESTAMP = '2';

export const TEST_CONTENT = 'dummy_content';
export const TEST_IMMUTABLE_CONTENT = 'immutable_content';
export const TEST_JSON_CONTENT = '[]';
export const TEST_OBJECT_CONTENT = '{"foo":1}';
export const TEST_INVALID_OBJECT_CONTENT = '{"foo":1}[';
export const TEST_OBJECT_PATCH_CONTENT = '{"bar":2}';
export const TEST_OBJECT_MERGED_CONTENT = '{"foo":1,"bar":2}';
export const TEST_INVALID_JSON_CONTENT = '{"foo:1,"bar":2}';

export const TEXT_CONTENT_TYPE = 'text/plain';
export const JSON_CONTENT_TYPE = jsonContentType;
export const ALTERNATE_CONTENT_TYPE = 'application/x-www-form-urlencoded';
