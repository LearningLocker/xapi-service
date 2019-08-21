export default (overrides: any = {}): any => {
  return {
    actor: {
      mbox: 'mailto:test@example.com',
    },
    verb: {
      id: 'http://www.example.com/verb',
    },
    object: {
      id: 'http://www.example.com/object',
    },
    attachments: [],
    context: {},
    ...overrides,
  };
};
