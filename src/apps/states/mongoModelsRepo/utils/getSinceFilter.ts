export default (since?: Date) => {
  if (since === undefined) {
    return {};
  }
  return { updatedAt: { $gt: since } };
};
