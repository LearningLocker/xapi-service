// Ryan: I wish we didn't have to do this, but time filters use stored not timestamp.
export default (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
