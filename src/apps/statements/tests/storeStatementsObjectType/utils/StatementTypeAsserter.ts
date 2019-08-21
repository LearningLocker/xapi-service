type StatementTypeAsserter = (
  obj: any,
  objectType: string,
  objCreator: (data: any) => any,
) => Promise<void>;

export default StatementTypeAsserter;
