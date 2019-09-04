export default (etagHeader: string|undefined) => {
  if (etagHeader === undefined) {
    return undefined;
  }
  return etagHeader.replace(/\"/g, '');
};
