export default (etag?: string) => {
  if (etag === undefined) {
    return {};
  }
  return { etag };
};
