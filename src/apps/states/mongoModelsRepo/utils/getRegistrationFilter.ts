export default (registration?: string) => {
  if (registration === undefined) {
    return {};
  }
  return { registration };
};
