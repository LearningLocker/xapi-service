import ClientModel from '../../../models/ClientModel';
import { XAPI_PROFILE_ALL } from '../../../utils/scopes';
import createClientModel from '../../utils/createClientModel';

export const TEST_CLIENT: ClientModel = createClientModel();
export const TEST_FORBIDDEN_CLIENT: ClientModel = createClientModel({
  scopes: [],
});
export const TEST_ALLOWED_CLIENT: ClientModel = createClientModel({
  scopes: [XAPI_PROFILE_ALL],
});
export const TEST_OUTSIDE_ORG_CLIENT: ClientModel = createClientModel({
  organisation: '4988f0f00000000000000000',
});
export const TEST_OUTSIDE_STORE_CLIENT: ClientModel = createClientModel({
  lrs_id: '4988f0f00000000000000001',
});

export const TEST_ACTIVITY_ID = 'http://www.example.org/fullActivityTest';
export const ANOTHER_TEST_ACTIVITY_ID = 'http://www.example.org/anotherFullActivityTest';
export const TEST_IMMUTABLE_ACTIVITY_ID = 'http://www.example.org/fullActivityTest/immutable';
export const TEST_BASE_ACTIVITY = {
  objectType: 'Activity',
  id: TEST_ACTIVITY_ID,
  definition: {
    name: {},
    description: {},
    extensions: {},
  },
};
export const TEST_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      'en-GB': 'test_gb_name',
    },
    description: {
      'en-GB': 'test_gb_description',
    },
    extensions: {
      'http://www.example.org/test_extension': 1,
    },
    moreInfo: 'http://www.example.org/moreInfo',
    type: 'http://www.example.org/type',
  },
};
export const TEST_MERGE_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      'en-US': 'test_us_name',
    },
    description: {
      'en-US': 'test_us_description',
    },
    extensions: {
      'http://www.example.org/test_merge_extension': 2,
    },
    moreInfo: 'http://www.example.org/mergedMoreInfo',
    type: 'http://www.example.org/mergedType',
  },
};
export const TEST_IMMUTABLE_ACTIVITY = {
  ...TEST_MERGE_ACTIVITY,
  id: TEST_IMMUTABLE_ACTIVITY_ID,
};
export const TEST_MERGED_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      ...TEST_ACTIVITY.definition.name,
      ...TEST_MERGE_ACTIVITY.definition.name,
    },
    description: {
      ...TEST_ACTIVITY.definition.description,
      ...TEST_MERGE_ACTIVITY.definition.description,
    },
    extensions: {
      ...TEST_ACTIVITY.definition.extensions,
      ...TEST_MERGE_ACTIVITY.definition.extensions,
    },
    moreInfo: 'http://www.example.org/mergedMoreInfo',
    type: 'http://www.example.org/mergedType',
  },
};
export const TEST_CONTEXT_ACTIVITIES = {
  context : {
    contextActivities: {
      category: [TEST_ACTIVITY],
      grouping: [TEST_ACTIVITY],
      parent: [TEST_ACTIVITY],
      other: [TEST_ACTIVITY],
    },
  },
};

export const ANOTHER_TEST_CONTEXT_ACTIVITIES = {
  context : {
    contextActivities: {
      category: [{ ...TEST_ACTIVITY, id: ANOTHER_TEST_ACTIVITY_ID }],
      grouping: [{ ...TEST_ACTIVITY, id: ANOTHER_TEST_ACTIVITY_ID }],
      parent: [{ ...TEST_ACTIVITY, id: ANOTHER_TEST_ACTIVITY_ID }],
      other: [{ ...TEST_ACTIVITY, id: ANOTHER_TEST_ACTIVITY_ID }],
    },
  },
};

export const TEST_CONTEXT_ACTIVITIES_RESULT = {
  context : {
    contextActivities: {
      category: [TEST_ACTIVITY_ID],
      grouping: [TEST_ACTIVITY_ID],
      parent: [TEST_ACTIVITY_ID],
      other: [TEST_ACTIVITY_ID],
    },
  },
};

export const TEST_MERGED_CONTEXT_ACTIVITIES_RESULT = {
  context : {
    contextActivities: {
      category: [TEST_ACTIVITY_ID, ANOTHER_TEST_ACTIVITY_ID],
      grouping: [TEST_ACTIVITY_ID, ANOTHER_TEST_ACTIVITY_ID],
      parent: [TEST_ACTIVITY_ID, ANOTHER_TEST_ACTIVITY_ID],
      other: [TEST_ACTIVITY_ID, ANOTHER_TEST_ACTIVITY_ID],
    },
  },
};

export const TEST_ACTIVITY_WITH_CONTEXT_ACTIVITIES = {
  ...TEST_ACTIVITY,
  ...TEST_CONTEXT_ACTIVITIES_RESULT,
};

export const TEST_ACTIVITY_WITH_MERGED_CONTEXT_ACTIVITIES = {
  ...TEST_ACTIVITY,
  ...TEST_MERGED_CONTEXT_ACTIVITIES_RESULT,
};
// tslint:disable-next-line:max-file-line-count
