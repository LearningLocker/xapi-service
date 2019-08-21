export default (overrides: any = {}): any => {
  return {
    actor: {
      objectType: 'Agent',
      mbox: 'mailto:test@example.com',
    },
    verb: {
      id: 'http://www.example.com/verb',
    },
    object: {
      objectType: 'Activity',
      id: 'http://www.example.com/object',
    },
    attachments: [],
    context: {},
    ...overrides,
  };
};
