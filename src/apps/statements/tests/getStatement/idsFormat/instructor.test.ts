import agentTest from './utils/agentTest';

describe('get ids statement in instructor', () => {
  agentTest((instructor: any): any => {
    return { context: { instructor } };
  });
});
