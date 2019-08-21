export default (member: any): any => {
  return {
    objectType: 'Group',
    mbox: 'mailto:test@example.com',
    member: [member],
  };
};
