const removeDuplications = <T, V>(
  elements: T[],
  mapper: (element: T) => V,
  uniqueElements: T[],
  existingValues: V[],
): T[] => {
  if (elements.length === 0) { return uniqueElements; }
  const [element, ...nextElements] = elements;
  const value: V = mapper(element);
  const isUniqueValue: boolean = existingValues.indexOf(value) === -1;
  const nextUniqueElements: T[] = isUniqueValue ? [...uniqueElements, element] : uniqueElements;
  const nextExistingValues: V[] = isUniqueValue ? [...existingValues, value] : existingValues;
  return removeDuplications<T, V>(nextElements, mapper, nextUniqueElements, nextExistingValues);
};

export default <T, V>(arr: T[], mapper: (elem: T) => V): T[] => {
  return removeDuplications<T, V>(arr, mapper, [], []);
};
