import createStatement from '../../utils/createStatement';

export default (sourceId: string, targetId: string) => {
  return createStatement({
    id: sourceId,
    actor: {
      objectType: 'Agent',
      account: {
        homePage: 'http://www.example.com',
        name: sourceId,
      },
    },
    object: {
      objectType: 'StatementRef',
      id: targetId,
    },
  });
};
