import agentTest from './utils/agentTest';

describe('get ids statements in instructor', () => {
  agentTest((instructor: any): any => {
    return { context: { instructor } };
  });
});
