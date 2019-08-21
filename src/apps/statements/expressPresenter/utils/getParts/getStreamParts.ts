export default (data: string, boundary: string): string[] => {
  const partBoundary = new RegExp(`\\r?\\n?--${boundary}`);
  const dataParts = data.split(partBoundary);
  // Slices to ignore data before the first boundary and after the last boundary.
  return dataParts.slice(1, -1);
};
