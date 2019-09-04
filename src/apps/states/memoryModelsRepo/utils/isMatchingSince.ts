export default (updatedAt: Date, since?: Date) => {
  if (since === undefined) {
    return true;
  }
  return updatedAt > since;
};
